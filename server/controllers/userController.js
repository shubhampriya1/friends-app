import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

// Get user list
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  try {
    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    const sender = await User.findById(friendRequest.sender);
    const receiver = await User.findById(friendRequest.receiver);

    sender.friends.push(receiver._id);
    receiver.friends.push(sender._id);

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
