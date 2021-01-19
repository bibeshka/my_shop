const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Admin = require("../models/Admin");
const { adminAccessLimiter } = require("../utils/requestLimit");

const authUser = require("../middleware/authUser");
const User = require("../models/User");

// @desc    Get user info
// @route   GET /api/v1/user/me
// @access  Private
router.get("/api/v1/user/me", authUser, async (req, res) => {
  return res.send(req.admin);
});

// @desc    Create new user
// @route   POST /api/v1/user
// @access  Public
router.post("/api/v1/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();

    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    User login
// @route   POST /api/v1/user/login
// @access  Public
router.post("/api/v1/user/login", adminAccessLimiter, async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    return res.send({ user, token });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// @desc    User logout
// @route   POST /api/v1/user/logout
// @access  Private
router.post("/api/v1/user/logout", authUser, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    return res.send();
  } catch (err) {
    return res.status(500).send();
  }
});

// @desc    User logout all
// @route   POST /api/v1/user/logoutAll
// @access  Private
router.post("/api/v1/user/logoutAll", authUser, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    return res.send();
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
