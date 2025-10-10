import express from "express"
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
