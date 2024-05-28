const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: Schema.Types.ObjectId, ref: "Address" },
    delivery: { type: Schema.Types.ObjectId, ref: "Delivery" },
  },
  { timestamps: true }
);

cartSchema.index({ user: 1 });

const Cart = model("Cart", cartSchema);

module.exports = { Cart };
