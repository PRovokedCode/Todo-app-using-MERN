import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import focusSessionRoutes from "./routes/focusSessionRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/settings",settingsRoutes);
app.use("/focus-sessions", focusSessionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});