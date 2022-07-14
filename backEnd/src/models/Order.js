const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  // customerId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Customer",
  //   required: true,
  // },
  totalPrice: {
    type: Number,
    // required: true,
  },
  customerName: {
    type: String,
  },
  shipping: {
    type: Object
  },
  status: {
    type: String,
    enum: ['Cancel', 'Paying', 'Preparing', 'Shipping', 'Done']
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Order', OrderSchema, "orders")