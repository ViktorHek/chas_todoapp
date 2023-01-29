import { useState, useEffect } from "react";
import Todo from "./Todo";
function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const baseList = [
    { name: "do stuff", state: false },
    { name: "think stuff", state: false },
    { name: "learn stuff", state: false },
  ];

  useEffect(() => {
    let ls = localStorage.getItem("todos");
    if (ls) {
      populateList(ls);
    } else {
      localStorage.setItem("todos", JSON.stringify(baseList));
      setTodoList(baseList);
    }
  }, []);

  function populateList(ls) {
    let lsArr = JSON.parse(ls);
    let newArr = [];
    lsArr.forEach((el) => {
      let obj = {
        name: el.name,
        state: el.state,
      };
      newArr.push(obj);
    });
    setTodoList(newArr);
  }

  function handleClick(name) {
    let ls = localStorage.getItem("todos");
    if (!ls) return;
    let lsArr = JSON.parse(ls);
    lsArr.forEach((el) => {
      if (el.name === name) {
        el.state = !el.state;
      }
    });
    setTodoList(lsArr);
    localStorage.setItem("todos", JSON.stringify(lsArr));
  }

  function handleInput(event) {
    setInput(event.target.value);
  }

  function addTask(event) {
    event.preventDefault();
    let ls = localStorage.getItem("todos");
    if (ls) {
      let lsArr = JSON.parse(ls);
      let obj = {
        name: input,
        state: false,
      };
      lsArr.push(obj);
      setTodoList(lsArr);
      localStorage.setItem("todos", JSON.stringify(lsArr));
    } else {
      let obj = {
        name: input,
        state: false,
      };
      localStorage.setItem("todos", JSON.stringify(obj));
    }
  }

  const displayList = todoList.map((el) => {
    return (
      <div className="container" key={el.name}>
        <Todo task={el} onClick={handleClick} />
      </div>
    );
  });

  return (
    <div className="app-container">
      <div className="input-container">
        <form onSubmit={addTask} className="form">
          <label>
            Add To Do Activety
            <input
              type="text"
              name="add"
              style={{backgroundColor: '#8c8cc6'}}
              value={input}
              onChange={(event) => handleInput(event)}
            />
          </label>
          <input type="submit" value="Submit" className="submit"/>
        </form>
      </div>
      <div>{displayList && displayList}</div>
    </div>
  );
}

export default App;
