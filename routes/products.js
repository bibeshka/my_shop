const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");

const paginatedResults = require("../utils/pagination");

const { productLimiter } = require("../utils/requestLimit");

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

// // @desc Upload image
// // @route POST /api/v1/images
// // @acess Public
// router.post("/api/v1/images", upload.single("upload"), async (req, res) => {
//   // req.file.buffer
//   // req.product.image_upload = req.file.buffer;
//   res.status(201).send(req.file);
// });

// @desc    Add new product
// @route   POST /api/v1/products
// @access  Private
router.post(
  "/api/v1/products",
  // auth,
  upload.any("file"),
  async (req, res) => {
    let imgArr = [];

    req.files.map((file) => {
      console.log(file.filename);
      imgArr.push(file.filename);
    });

    console.log(imgArr);
    try {
      // req.body.image = req.file.path;
      // req.body.images = req.files;

      // req.body.images = req.files.filename;

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
  console.log(req.connection.remoteAddress);
  if (req.query.search !== undefined) {
    try {
      const products = await Product.find({});
      let matches = products.filter((product) => {
        const regex = new RegExp(`${req.query.search}`, "gi");
        return product.name.match(regex);
      });

      if (req.query.search.length === 0) {
        matches = products;
      }

      return res.status(200).send(paginatedResults(matches, req));
    } catch (err) {
      return res.status(500).send(err);
    }
  } else if (req.query.search === undefined) {
    try {
      const products = await Product.find({});

      return res.status(200).send(paginatedResults(products, req));
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

// @desc    Update single product
// @route   PATCH /api/v1/products/:id
// @access  Private
router.patch("/api/v1/products/:id", auth, async (req, res) => {
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
});

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
