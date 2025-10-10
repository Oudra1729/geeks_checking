import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTask,
} from "../controllers/tasks.controllers.js";

const router = express.Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTaskById);
router.delete("/tasks/:id", deleteTask);

export default router;
