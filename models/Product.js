const mongoose = require("mongoose");

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
  image: {
    type: String,
    trim: true,
  },
  image_upload: {
    type: Buffer,
  },
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
});

module.exports = Product;
