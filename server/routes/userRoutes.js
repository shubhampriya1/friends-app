import express from "express";
import {
  getUsers,
  sendFriendRequest,
  acceptFriendRequest,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, getUsers);
router.post("/friends/request", protect, sendFriendRequest);
router.post("/friends/accept", protect, acceptFriendRequest);

export default router;
