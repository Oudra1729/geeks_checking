const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BASE_URL = "https://jsonplaceholder.typicode.com";

//
app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

//
app.get("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
});

//
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, req.body);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
});

// 
app.put("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.put(`${BASE_URL}/posts/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`${BASE_URL}/posts/${req.params.id}`);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
