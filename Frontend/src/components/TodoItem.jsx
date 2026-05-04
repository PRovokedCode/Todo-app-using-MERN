import axios from "axios";

function TodoItem({ todo, todos, setTodos }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todo._id}`);

      const updatedTodos = todos.filter((item) => item._id !== todo._id);

      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/todos/${todo._id}`,

        {
          completed: !todo.completed,
        },
      );

      const updatedTodos = todos.map((item) => {
        if (item._id === todo._id) {
          return response.data;
        }

        return item;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo-item">
      <div>
        <p
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.text}
        </p>

        {todo.deadline && <p>Deadline: {todo.deadline}</p>}
      </div>

      <div className="todo-buttons">
        <button onClick={handleToggle}>Complete</button>

        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
