const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const authUser = require("../middleware/authUser");

const paginatedResults = require("../utils/pagination");
const { productLimiter } = require("../utils/requestLimit");
const { checkIsAdmin } = require("../utils/authUtils");

//connect to stream gfs
const mongoose = require("mongoose");
const upload = require("../utils/imageStorage");
const connect = mongoose.createConnection(process.env.MONGO_URI);
let gfs;
connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});
//connect to stream gfs

// @desc    Add new product
// @route   POST /api/v1/products
// @access  Private
router.post(
  "/api/v1/products",
  upload.any("file"),
  authUser,
  checkIsAdmin,
  async (req, res) => {
    let imgArr = [];
    req.files.map((file) => {
      imgArr.push(file.filename);
    });
    try {
      req.body.images = imgArr;

      let product = await Product.create(req.body);

      res.status(201).send(product);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
router.get("/api/v1/products", productLimiter, async (req, res) => {
  const name = req.query.search || "";
  const nameFileter = name ? { name: { $regex: name, $options: "i" } } : {};
  const searchId = req.query.searchId || "";
  const idFileter = searchId ? { _id: searchId } : {};

  try {
    const products = await Product.find({ ...nameFileter, ...idFileter }).sort({
      _id: -1,
    });

    return res.status(200).send(paginatedResults(products, req));
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get single product by id
// @route   GET /api/v1/products/:id
// @access  Public
router.get("/api/v1/products/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).send();
    }

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update single product
// @route   PATCH /api/v1/products/:id
// @access  Private
router.patch(
  "/api/v1/products/:id",
  authUser,
  checkIsAdmin,
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "description", "age", "price"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(404).send({ error: "Invalid updates!" });
    }

    try {
      const product = await Product.findOne({ _id: req.params.id });

      if (!product) {
        res.status(404).send();
      }

      updates.forEach((update) => (product[update] = req.body[update]));
      await product.save();
      res.send(product);
    } catch (err) {
      res.status(500).send(error);
    }
  }
);

// @desc    Delete single product
// @route   DELETE /api/v1/products/:id
// @access  Private
router.delete(
  "/api/v1/products/:id",
  authUser,
  checkIsAdmin,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).send();
      }

      return res.send(product);
    } catch (err) {
      res.status(500).send();
    }
  }
);

// @desc    Create new rieview for product
// @route   POST /api/v1/products/:id/reviews
// @access  Private
router.post("/api/v1/products/:id/reviews", authUser, async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).send();
    }

    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    }

    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = (
      product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length
    ).toFixed(2);
    const updatedProduct = await product.save();

    res.status(201).send({
      message: "Review Created",
    });
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
