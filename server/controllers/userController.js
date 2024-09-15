import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 10; // Number of users per page, default is 10
    const skip = (page - 1) * limit;

    // Get the current user's friends
    const currentUser = await User.findById(userId).populate("friends");

    // Step 1: Get users with mutual friends
    const usersWithMutualFriends = await User.find({
      _id: { $ne: userId }, // Exclude current user
      friends: { $in: currentUser.friends }, // Find users who are friends with the current user's friends
    })
      .populate("friends")
      .skip(skip)
      .limit(limit);

    let users = [];

    if (usersWithMutualFriends.length > 0) {
      // Step 2: Map through and filter users with mutual friends
      users = usersWithMutualFriends.map((user) => {
        const mutualFriends = currentUser.friends.filter((friend) =>
          user.friends.includes(friend._id)
        );

        return {
          _id: user._id,
          username: user.username,
          mutualFriends: mutualFriends.length > 0 ? mutualFriends : null,
        };
      });
    } else {
      // Step 3: If no mutual friends are found, return random users
      users = await User.find({ _id: { $ne: userId } }) // Exclude current user
        .skip(skip)
        .limit(limit)
        .select("_id username");
    }

    // Step 4: Calculate total users for pagination metadata
    const totalUsers = await User.countDocuments({ _id: { $ne: userId } });
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      page,
      totalPages,
      users,
    });
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

export const searchUser = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const userId = req.user._id;

    // Search for users with usernames that contain the search term (case-insensitive)
    const users = await User.find({
      username: { $regex: searchTerm, $options: "i" },
      _id: { $ne: userId }, // Exclude the logged-in user from the search
    });

    // Get the current user's friends
    const currentUser = await User.findById(userId).populate("friends");

    // Map through the search results and calculate mutual friends
    const results = users.map((user) => {
      // Find mutual friends by intersecting friend lists
      const mutualFriends = currentUser.friends.filter((friend) =>
        user.friends.includes(friend._id)
      );

      return {
        _id: user._id,
        username: user.username,
        mutualFriends: mutualFriends.length > 0 ? mutualFriends : null,
      };
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
