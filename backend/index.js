import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db-connect.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

app.use(cors(
    {
        origin: "*",
        credentials: true,
    }
));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const PORT = process.env.PORT || 9090;

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});