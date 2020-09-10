const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");

const fs = require("fs");
const multer = require("multer");
let upload = multer();

router.post("/api/v1/images", upload.single("image"), async (req, res) => {
  // req.file.buffer
  // req.product.image_upload = req.file.buffer;
  await req.product.save();
  return res.status(201).send();
});

// @desc    Add new product
// @route   POST /api/v1/products
// @access  Private
router.post(
  "/api/v1/products",
  auth,
  upload.single("image_upload"),
  async (req, res) => {
    try {
      // // if(req.body.image_upload.data) {
      req.body.image_upload = req.file.buffer;
      // // }

      // let buf = Buffer.from(req.body.image_upload);

      // req.body.image_upload = buf.toString('base64')

      // console.log(req.file.buffer);

      let product = await Product.create(req.body);

      // console.log(req.file.buffer);
      // console.log(req.body.image_upload);

      res.status(201).send(product);

      // return res.status(201).send(product);
    } catch (err) {
      res.status(500).send(err);
    }
    // await product.save().then(() => {
  }
);

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
router.get("/api/v1/products", async (req, res) => {
  if (req.query.search === undefined && req.query.searchId === undefined) {
    try {
      const products = await Product.find({});

      return res.status(200).send(products);
    } catch (err) {
      return res.status(500).send(err);
    }
  } else if (req.query.searchId) {
    try {
      const products = await Product.find({ _id: req.query.searchId });
      return res.status(200).send(products);
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    try {
      const products = await Product.find({ name: req.query.search });
      return res.status(200).send(products);
    } catch (err) {
      return res.status(500).send(err);
    }
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

router.get("/api/v1/products/search/:query", async (req, res) => {});

// @desc    Delete single product
// @route   DELETE /api/v1/products/:id
// @access  Private
router.delete("/api/v1/products/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    return res.send(product);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
