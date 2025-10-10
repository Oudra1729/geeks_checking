import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
