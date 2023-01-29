import { useState } from "react";

function Todo(props) {
  const { onClick, task } = props;
  const [isChecked, setIsChecked] = useState(task.state)

    function checkTask(name) {
        setIsChecked(!isChecked)
        return onClick(name)
    }

  return (
    <button className={`button ${isChecked}`} onClick={() => checkTask(task.name)}>
      {task.name}
    </button>
  );
}

export default Todo;
