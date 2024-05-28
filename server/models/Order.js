const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    delivery: { type: Schema.Types.ObjectId, ref: "Delivery" },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1 });

const Order = model("Order", orderSchema);

module.exports = { Order };
