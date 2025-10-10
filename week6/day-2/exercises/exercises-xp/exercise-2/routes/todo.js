import express from "express";

const router = express.Router();

let todos = [];

router.get("/", (req, res) => {
  try {
    if (todos.length === 0) {
      throw new Error("No todos found");
    }
    res.json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const data = req.body;
    todos.push(data);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { completed, title } = req.body;
    const id = req.params.id;
    const todo = todos.find((tod) => tod.id == id);
    todo.title = title;
    todo.completed = completed;
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    todos = todos.filter((todo) => todo.id != id);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
