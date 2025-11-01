const express = require("express");
const Leave = require("../models/Leave");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");
const router = express.Router();

// Apply for leave
router.post("/apply", protect, async (req, res) => {
  try {
    const leave = await Leave.create({ ...req.body, employee: req.user._id });
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View employee's leaves
router.get("/my-leaves", protect, async (req, res) => {
  const leaves = await Leave.find({ employee: req.user._id });
  res.json(leaves);
});

// Admin: View all leave requests
router.get("/all", protect, adminOnly, async (req, res) => {
  const leaves = await Leave.find().populate("employee", "name email");
  res.json(leaves);
});

// Admin: Update leave status
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = req.body.status;
    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
