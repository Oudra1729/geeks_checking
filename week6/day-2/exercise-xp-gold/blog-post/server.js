import express from "express";
import blogRouter from "./routers/blog.router.js";

const app = express();
const PORT = 4000;

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle invalid JSON payloads gracefully
app.use((err, req, res, next) => {
  const isJsonParseError =
    err &&
    (err.type === "entity.parse.failed" ||
      err instanceof SyntaxError ||
      err.status === 400);
  if (isJsonParseError) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  return next(err);
});

app.use("/", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
