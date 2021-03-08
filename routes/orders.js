const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const { orderLimiter, stripeLimiter } = require("../utils/requestLimit");
//hide key
const stripe = require("stripe")(process.env.STRIPE_KEY_PRIVATE);

const { checkIsAdmin } = require("../utils/authUtils");
const authUser = require("../middleware/authUser");

// @desc    Add new order
// @route   POST /api/v1/orders
// @access  Public
router.post("/api/v1/orders", orderLimiter, async (req, res) => {
  try {
    const order = await Order.create(req.body);

    return res.status(201).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @desc send payment info to stripe
// @route POST /api/v1/create-payment-intent
// @access Public
router.post(
  "/api/v1/create-payment-intent",
  stripeLimiter,
  async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private
router.get("/api/v1/orders", authUser, checkIsAdmin, async (req, res) => {
  const name = req.query.search || "";
  const nameFileter = name ? { name: { $regex: name, $options: "i" } } : {};
  const searchId = req.query.searchId || "";
  const idFileter = searchId ? { _id: searchId } : {};

  try {
    const orders = await Order.find({ ...nameFileter, ...idFileter }).sort({
      _id: -1,
    });

    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get single order by id
// @route   GET /api/v1/order/:id
// @access  Private
router.get("/api/v1/orders/:id", authUser, checkIsAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const order = await Order.findById(_id);

    if (!order) {
      return res.status(404).send();
    }

    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Delete single order
// @route   DELETE /api/v1/orders/:id
// @access  Private
router.delete(
  "/api/v1/orders/:id",
  authUser,
  checkIsAdmin,
  async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);

      if (!order) {
        return res.status(404).send();
      }

      return res.send(order);
    } catch (err) {
      res.status(500).send();
    }
  }
);

module.exports = router;
