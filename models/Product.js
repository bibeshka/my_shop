const mongoose = require("mongoose");

const reviewProduct = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
});

const Product = mongoose.model("Product", {
  name: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    require: true,
  },
  images: {
    type: Array,
    require: true,
  },

  // images: [
  //   {
  //     originalname: {
  //       type: String,
  //     },
  //     buffer: {
  //       type: Buffer,
  //     },
  //   },
  // ],
  age: {
    type: Number,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    trim: true,
  },
  keywords: {
    type: Array,
    trim: true,
  },
  reviews: [reviewProduct],
});

module.exports = Product;
