import axios from "axios";

const API = "http://localhost:5000/todos";

export const fetchTodos = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createTodo = async (todo) => {
  const res = await axios.post(API, todo);
  return res.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API}/${id}`);
};

export const toggleTodo = async (id) => {
  const res = await axios.put(`${API}/${id}`);
  return res.data;
};