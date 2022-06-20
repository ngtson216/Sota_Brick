const mongoose = require("mongoose");
const StockSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  type: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Stock", StockSchema, "stocks");
