import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../models/tasks.json");

const readTasksFromFile = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeTasksToFile = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

export const getAllTasks = (req, res) => {
  try {
    const tasks = readTasksFromFile();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to read tasks" });
  }
};

export const getTaskById = (req, res) => {
  try {
    const tasks = readTasksFromFile();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to read tasks" });
  }
};

export const createTask = (req, res) => {
  try {
    const tasks = readTasksFromFile();
    const newTask = { id: uuidv4(), ...req.body };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTaskById = (req, res) => {
  try {
    const tasks = readTasksFromFile();
    const task = tasks.find((task) => task.id === req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    tasks[task] = { ...tasks[task], ...req.body };
    writeTasksToFile(tasks);
    res.json({ message: "Task updated successfully", task: task });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = (req, res) => {
  try {
    const tasks = readTasksFromFile();
    const task = tasks.find((task) => task.id === req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const deletedTask = tasks.splice(task, 1);
    writeTasksToFile(tasks);
    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
