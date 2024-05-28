const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const deliverySchema = new Schema({
  name: String,
  logoPath: String,
  price: Number,
});

const Delivery = model("Delivery", deliverySchema);

module.exports = { Delivery };
