const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");

//hide key
// const stripe = require("stripe")("sk_live_xbcflva2JLBYWj7OZ92kuJhI00aemJvMks"); // live api key

const stripe = require("stripe")(
  "sk_test_51HP6VbCJ8dyZDIAq7fwS70CJ5IxcYchKTIIRkx65Udi6WsvbZD9E0bw3wcdYctA5HOKeS90bq0JrDYWw1DWB7wcU007nX8QZ4a"
);

// @desc    Add new order
// @route   POST /api/v1/orders
// @access  Public
router.post("/api/v1/orders", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    return res.status(201).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
  // await product.save().then(() => {
});

// @desc send payment info to stripe
// @route POST /api/v1/create-payment-intent
// @access Public
router.post("/api/v1/create-payment-intent", async (req, res) => {
  // console.log(req.body);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private
router.get("/api/v1/orders", auth, async (req, res) => {
  if (req.query.search == undefined && req.query.searchId == undefined) {
    try {
      const orders = await Order.find({});

      return res.status(200).send(orders);
    } catch (err) {
      return res.status(500).send(err);
    }
  } else if (req.query.searchId) {
    try {
      const orders = await Order.find({ _id: req.query.searchId });
      return res.status(200).send(orders);
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    try {
      const orders = await Order.find({ name: req.query.search });
      return res.status(200).send(orders);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

// @desc    Get single order by id
// @route   GET /api/v1/order/:id
// @access  Private
router.get("/api/v1/orders/:id", auth, async (req, res) => {
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
router.delete("/api/v1/orders/:id", auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).send();
    }

    return res.send(order);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
