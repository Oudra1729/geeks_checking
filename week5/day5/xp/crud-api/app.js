import express from "express";
import { fetchPosts } from "./data/dataService.js";

const app = express();
const PORT = 5000;

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log("✅ Data retrieved successfully");
    res.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts", err.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 CRUD API running at http://localhost:${PORT}`)
);
