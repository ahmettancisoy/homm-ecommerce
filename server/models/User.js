const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    avatarPath: String,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = { User };
