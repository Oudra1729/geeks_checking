import express from "express";
import bookRoutes from "./routes/books.route.js";

const app = express();
const PORT = 5000;
app.use(express.json());

app.use("/api", bookRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Book API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
