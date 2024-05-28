const express = require("express");
const {
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
} = require("../controllers/productController");
const { getUsers } = require("../controllers/authController");
const { addAddress, getAddress } = require("../controllers/userController");

const router = express.Router();

router.route("/auth").get(getUsers);

router.route("/").get(getProducts);

router.route("/cart/:userId").get(getCart);

router.route("/user/address/:userId").get(getAddress).post(addAddress);

router
  .route("/cart/:userId/:productId")
  .post(addToCart)
  .delete(removeCartItem)
  .patch(updateCartItem);

router.route("/delivery/address/:userId").post(updateCartAddress);

router.route("/delivery/firm/:userId").post(updateCartDelivery);

router.route("/delivery/firm").get(getDeliveryFirms);

router.route("/delivery/confirm/:userId").post(completeOrder);

router.route("/order/:userId").get(getOrders);

module.exports = router;
