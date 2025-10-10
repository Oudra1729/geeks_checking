import express from "express";
import postsRoutes from "./routes/posts.routes.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", postsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});