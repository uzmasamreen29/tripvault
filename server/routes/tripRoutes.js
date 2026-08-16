const express = require("express");
const Trip = require("../models/Trip");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new trip
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
    } = req.body;

    const trip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
      user: req.user.id,
    });

    await trip.save();

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get all trips for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get a single trip by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
// Update a trip
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const {
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
    } = req.body;

    trip.title = title;
    trip.destination = destination;
    trip.startDate = startDate;
    trip.endDate = endDate;
    trip.description = description;
    trip.rating = rating;

    await trip.save();

    res.status(200).json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
// Delete a trip
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await trip.deleteOne();

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
router.post(
  "/:id/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    // Check ownership
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to upload to this trip",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    // Cloudinary URL
    const imageUrl = req.file.path;

    // Add image to photos array
    trip.photos.push(imageUrl);

    // Latest uploaded image becomes cover image
trip.coverImage = imageUrl;
    await trip.save();

    res.status(200).json({
      message: "Photo uploaded successfully",
      imageUrl,
      trip,
    });
  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      message: "Failed to upload photo",
    });
  }
});
module.exports = router;