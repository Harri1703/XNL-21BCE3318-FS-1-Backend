const express = require("express");
const { User } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Get Current User
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users (Admin Only)
router.get("/all", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
