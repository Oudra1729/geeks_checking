import express from "express";

const router = express.Router();

const blogPosts = [
  {
    id: 1,
    title: "My First Blog Post",
    content:
      "This is the content of my first blog post. I'm excited to share my thoughts with the world!",
    timestamp: new Date(),
  },
  {
    id: 2,
    title: "Another Day, Another Post",
    content:
      "Here's some more content for my blog. I'm really getting the hang of this!",
    timestamp: new Date(),
  },
  {
    id: 3,
    title: "Final Post",
    content: "This is the last post in my blog. It's been a great journey!",
    timestamp: new Date(),
  },
];

router.get("/posts", (req, res) => {
  try {
    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/posts/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = blogPosts.find((p) => p.id === id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/posts", (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const newPost = {
      id: blogPosts.length + 1,
      title,
      content,
      timestamp: new Date(),
    };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/posts/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = blogPosts.find((p) => p.id === id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    post.title = title;
    post.content = content;
    res.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/posts/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const postIndex = blogPosts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    blogPosts.splice(postIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
