const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Admin = require("../models/Admin");
const { adminAccessLimiter } = require("../utils/requestLimit");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/authUtils");

const bcrypt = require("bcrypt");

const authUser = require("../middleware/authUser");
const User = require("../models/User");

// @desc    Get user info
// @route   GET /api/v1/user/me
// @access  Private
router.get("/api/v1/user/me", authUser, async (req, res) => {
  return res.send(req.user);
});

// @desc    Create new user
// @route   POST /api/v1/user
// @access  Public
router.post("/api/v1/user", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const createUser = await user.save();
    const token = await user.generateAuthToken();

    return res.status(201).send({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      token: token.accessToken,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    User login
// @route   POST /api/v1/user/login
// @access  Public
router.post("/api/v1/user/login", adminAccessLimiter, async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        const token = await user.generateAuthToken();

        return res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token.accessToken,
        });
      } else {
        return res.status(401).send({ message: "Invalid Password" });
      }
    } else {
      res.status(404).send({ message: "No user found!" });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

// @desc    User logout
// @route   POST /api/v1/user/logout
// @access  Private
router.post("/api/v1/user/logout", authUser, async (req, res) => {
  try {
    // req.user.tokens = req.user.tokens.filter((token) => {
    //   return token.token !== req.token;
    // });
    req.user.token = {
      accessToken: "",
      refreshToken: "",
    };

    await req.user.save();

    return res.status(200).send();
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
