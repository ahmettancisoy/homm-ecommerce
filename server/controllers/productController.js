const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { Product } = require("../models/Product");
const { Cart } = require("../models/Cart");
const { Delivery } = require("../models/Delivery");
const { Order } = require("../models/Order");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).lean().exec();

  if (!products) return res.status(404).send({ message: "Products not found" });

  res.status(200).send(products);
});

const addToCart = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { userId, productId } = req.params;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
  }
  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === productId
  );
  if (productIndex > -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }
  const response = await cart.save();

  if (!response) return res.status(404).send({ message: "Failed to add cart" });

  const populatedCart = (
    await response.populate("products.product")
  ).toObject();

  res
    .status(200)
    .send({ message: "Successfully added to cart", cart: populatedCart });
});

const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ user: userId })
    .populate("products.product")
    .lean()
    .exec();

  if (!cart) return res.status(404).send({ message: "Cart not found" });

  res.status(200).send(cart);
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) return res.status(404).send({ message: "Cart not found" });

  cart.products = cart.products.filter((p) => !p.product._id.equals(productId));
  console.log(productId);

  const savedCart = await cart.save();

  if (!savedCart)
    return res.status(404).send({ message: "Removing item failed" });

  const populatedCart = (
    await savedCart.populate("products.product")
  ).toObject();

  res
    .status(200)
    .send({ message: "Successfully removed from cart", cart: populatedCart });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { userId, productId } = req.params;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, products: [] });
  }
  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === productId
  );
  if (productIndex > -1) {
    cart.products[productIndex].quantity = quantity;
  }

  const response = await cart.save();

  if (!response) return res.status(404).send({ message: "Failed to add cart" });

  const populatedCart = (
    await response.populate("products.product")
  ).toObject();

  res
    .status(200)
    .send({ message: "Successfully added to cart", cart: populatedCart });
});

const updateCartAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { selectedAddress } = req.body;

  const cart = await Cart.findOne({ user: userId });

  cart.address = selectedAddress._id;

  const savedCart = await cart.save();

  if (!savedCart)
    return res.status(404).send({ message: "Adding address to cart failed" });

  res.status(200).send(selectedAddress);
});

const updateCartDelivery = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { selectedDelivery } = req.body;

  const cart = await Cart.findOne({ user: userId });

  cart.delivery = selectedDelivery._id;

  const savedDelivery = await cart.save();

  if (!savedDelivery)
    return res.status(404).send({ message: "Adding delivery firm failed" });

  res.status(200).send(savedDelivery);
});

const getDeliveryFirms = asyncHandler(async (req, res) => {
  const deliveryFirms = await Delivery.find({}).lean().exec();
  if (!deliveryFirms)
    return res.status(404).send({ message: "Delivery firms not found" });
  res.status(200).send(deliveryFirms);
});

const completeOrder = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ user: userId })
    .populate("products.product address delivery")
    .exec();

  if (!cart) return res.status(404).send({ message: "Cart not found" });

  const orderData = {
    user: cart.user,
    products: cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    })),
    totalPrice: cart.products.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    ),
    address: cart.address,
    delivery: cart.delivery,
  };

  const newOrder = new Order(orderData);
  const savedOrder = await newOrder.save();

  if (!savedOrder) return res.status(404).send({ message: "Order failed" });

  await Cart.findByIdAndDelete(cart._id);

  res.status(200).send({ message: "Order created successfully" });
});

const getOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ user: userId })
    .populate("address delivery products.product")
    .lean()
    .exec();

  if (!orders) return res.status(404).send({ message: "Orders not found" });

  res.status(200).send(orders);
});

module.exports = {
  getProducts,
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
  updateCartAddress,
  updateCartDelivery,
  getDeliveryFirms,
  completeOrder,
  getOrders,
};
