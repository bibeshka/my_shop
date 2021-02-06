const mongoose = require("mongoose");

const reviewProduct = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
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
      rating: {
        type: Number,
        require: true,
      },
      numReviews: {
        type: Number,
        require: true,
      },
      reviews: [reviewProduct],
    },
    { timestamps: true }
  )
);

module.exports = Product;
