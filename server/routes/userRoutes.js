import express from "express";
import {
  getUsers,
  sendFriendRequest,
  acceptFriendRequest,
  searchUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, getUsers);
router.post("/friends/request", protect, sendFriendRequest);
router.post("/friends/accept", protect, acceptFriendRequest);
router.get("/search", protect, searchUser);

export default router;
