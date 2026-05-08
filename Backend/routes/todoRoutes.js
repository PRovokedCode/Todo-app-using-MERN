import express from "express";

import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", toggleTodo);

export default router;