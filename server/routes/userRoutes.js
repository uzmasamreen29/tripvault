const express = require("express");
const User = require("../models/User");
const Trip = require("../models/Trip");

const router = express.Router();

// Public profile
router.get("/:username/profile", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    }).select("name username bio");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const trips = await Trip.find({
      user: user._id,
    }).select(
      "title destination startDate endDate rating coverImage"
    );

    res.status(200).json({
      user: {
        name: user.name,
        username: user.username,
        bio: user.bio,
      },
      trips,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
 
const authMiddleware = require("../middleware/authMiddleware");

// Update logged-in user's profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, bio } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (username) {
      user.username = username;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        username: user.username,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
});

module.exports = router;