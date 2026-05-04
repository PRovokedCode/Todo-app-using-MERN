import { useState } from "react";
import axios from "axios";

function TodoForm({ todos, setTodos }) {
  const [input, setInput] = useState("");

  const [deadline, setDeadline] = useState("");

  const handleAddTodo = async () => {
    if (input.trim() === "") return;

    const newTodo = {
      text: input,
      completed: false,
      deadline: deadline,
    };

    try {
      const response = await axios.post("http://localhost:5000/todos", newTodo);

      setTodos([...todos, response.data]);
    } catch (error) {
      console.log(error);
    }

    setInput("");
    setDeadline("");
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        placeholder="Enter todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
}

export default TodoForm;
