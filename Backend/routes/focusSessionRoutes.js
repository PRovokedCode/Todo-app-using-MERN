import express from "express";

import {
  getSessions,
  createSession,
  deleteSession,
} from "../controllers/focusSessionController.js";

const router = express.Router();

router.get("/", getSessions);

router.post("/", createSession);

router.delete("/:id", deleteSession);

export default router;