const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    cityId: { type: String, required: true },
    districtId: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Address = model("Address", addressSchema);

module.exports = { Address };
