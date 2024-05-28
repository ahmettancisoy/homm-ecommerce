const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { Address } = require("../models/Address");
const { User } = require("../models/User");

const addAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { details } = req.body;

  const address = new Address({
    user: userId,
    title: details.title,
    cityId: details.cityId,
    districtId: details.districtId,
    address: details.address,
  });
  const savedAddress = await address.save();
  if (!savedAddress)
    return res.status(404).send({ message: "Couldn't save address" });

  const updatedUser = await User.findByIdAndUpdate(userId, {
    $push: { addresses: address._id },
  });

  if (!updatedUser)
    return res.status(404).send({ message: "Couldn't update address" });

  res.status(200).send(savedAddress);
});

const getAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const userAddress = await Address.find({ user: userId }).lean().exec();

  if (!userAddress)
    return res.status(404).send({ message: "Address not found" });

  res.status(200).send(userAddress);
});

module.exports = {
  addAddress,
  getAddress,
};
