 
const express = require('express');
const router = express.Router();

// In-memory array to store blog posts
let posts = [];
let nextId = 1;

// Validation helper
function validatePost(data) {
  const { title, content } = data;
  if (!title || !content) {
    return 'Title and content are required.';
  }
  return null;
}

// GET /posts - Get all blog posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET /posts/:id - Get a specific blog post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json(post);
});

// POST /posts - Create a new blog post
router.post('/', (req, res) => {
  const error = validatePost(req.body);
  if (error) return res.status(400).json({ error });

  const newPost = {
    id: nextId++,
    title: req.body.title,
    content: req.body.content,
    timestamp: new Date().toISOString(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id - Update a blog post
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found.' });

  const error = validatePost(req.body);
  if (error) return res.status(400).json({ error });

  post.title = req.body.title;
  post.content = req.body.content;
  post.timestamp = new Date().toISOString();

  res.json(post);
});

// DELETE /posts/:id - Delete a blog post
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Post not found.' });

  posts.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
