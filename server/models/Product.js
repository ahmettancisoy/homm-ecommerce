const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imagePath: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = { Product };
