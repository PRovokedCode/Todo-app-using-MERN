import { useEffect, useState } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");

      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <div className="todo-container">
        <h1>Todo App</h1>

        <TodoForm todos={todos} setTodos={setTodos} />

        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
