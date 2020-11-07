const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Admin = require("../models/Admin");

const { adminAccessLimiter } = require("../utils/requestLimit");

// // @desc    Add new admin
// // @route   POST /api/v1/admin
// // @access  Private
// //DELETE LATER
// router.post("/api/v1/admin", async (req, res) => {
//   try {
//     const admin = await Admin.create(req.body);
//     const token = await admin.generateAuthToken();

//     return res.status(201).send({ admin, token });
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// });

// @desc    Get admin info
// @route   GET /api/v1/admin/me
// @access  Private
router.get("/api/v1/admin/me", auth, async (req, res) => {
  return res.send(req.admin);
});

// @desc    Admin login
// @route   POST /api/v1/admin/login
// @access  Public
router.post("/api/v1/admin/login", adminAccessLimiter, async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();

    return res.send({ admin, token });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// @desc    Admin logout
// @route   POST /api/v1/admin/logout
// @access  Private
router.post("/api/v1/admin/logout", auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.admin.save();

    return res.send();
  } catch (err) {
    return res.status(500).send();
  }
});

// @desc    Admin logout all
// @route   POST /api/v1/admin/logoutAll
// @access  Private
router.post("/api/v1/admin/logoutAll", auth, async (req, res) => {
  try {
    req.admin.tokens = [];
    await req.amin.save();

    return res.send();
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
