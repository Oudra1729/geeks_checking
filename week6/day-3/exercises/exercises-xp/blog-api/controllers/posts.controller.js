import Posts from '../models/models.js';


const postsModel = new Posts();

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postsModel.findAll();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postsModel.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPost = async (req, res) => {
  const newPost = req.body;
  try {
    const createdPost = await postsModel.create(newPost);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  try {
    const post = await postsModel.update(id, updated);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await postsModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
