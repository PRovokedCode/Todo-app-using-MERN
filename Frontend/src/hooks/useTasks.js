import { useEffect, useMemo, useState } from "react";

import {
  fetchTodos,
  createTodo,
  deleteTodo as deleteTodoAPI,
  toggleTodo as toggleTodoAPI,
} from "../services/todoService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Load todos from backend
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();

      const formatted = data.map((todo) => ({
        id: todo._id,
        title: todo.title,
        priority: todo.priority,
        date: todo.deadline?.split("T")[0] || "",
        time: todo.deadline?.split("T")[1]?.slice(0, 5) || "",
        done: todo.completed,
      }));

      setTasks(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  // Add task
  const addTask = async (taskData) => {
    try {
      const deadline =
        taskData.date && taskData.time
          ? `${taskData.date}T${taskData.time}`
          : "";

      const newTodo = await createTodo({
        title: taskData.title,
        priority: taskData.priority,
        deadline,
      });

      const formatted = {
        id: newTodo._id,
        title: newTodo.title,
        priority: newTodo.priority,
        date: newTodo.deadline?.split("T")[0] || "",
        time: newTodo.deadline?.split("T")[1]?.slice(0, 5) || "",
        done: newTodo.completed,
      };

      setTasks((prev) => [formatted, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await deleteTodoAPI(id);

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle completed
  const toggleTask = async (id) => {
    try {
      const updated = await toggleTodoAPI(id);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                done: updated.completed,
              }
            : t
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "Completed") return t.done;

      if (filter === "Pending") return !t.done;

      if (filter === "High") return t.priority === "High";

      return true;
    });
  }, [tasks, filter, search]);

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length;

    const done = tasks.filter((t) => t.done).length;

    return {
      total,
      done,
      pending: total - done,
    };
  }, [tasks]);

  // Progress %
  const progress = stats.total
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  return {
    tasks,
    filteredTasks,
    stats,
    progress,
    filter,
    setFilter,
    search,
    setSearch,
    addTask,
    deleteTask,
    toggleTask,
  };
}