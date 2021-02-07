const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        require: true,
        trim: true,
      },
      total: {
        type: Number,
        require: true,
      },
      stripeClientSecret: {
        type: String,
      },
      order_items: [
        {
          product_id: {
            type: String,
            require: true,
          },
          name: {
            type: String,
            require: true,
          },
          qty: {
            type: Number,
          },
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = Order;
