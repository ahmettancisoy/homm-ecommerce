const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { User } = require("../models/User");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "-password").lean().exec();

  if (!users) return res.status(404).send({ message: "Users not found" });

  res.status(200).send(users);
});

module.exports = { getUsers };
