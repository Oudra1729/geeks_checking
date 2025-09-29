const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let todos = [];

//
app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const todo = { id: uuidv4(), title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

//
app.get("/api/todos", (req, res) => res.json(todos));

//
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

//
app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

// 
app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id !== req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
