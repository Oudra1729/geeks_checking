import express from "express";
import { registerUser, loginUser, getAllUsers, getUserById, updateUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);

export default router;
