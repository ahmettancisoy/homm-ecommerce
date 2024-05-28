import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Products from "./features/Products";
import Cart from "./features/Cart";
import CartLayout from "./components/CartLayout";
import Users from "./features/Users";
import Address from "./features/Address";
import Delivery from "./features/Delivery";
import Payment from "./features/Payment";
import OrderComplete from "./features/OrderComplete";
import "./index.css";
import Orders from "./features/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="/cart" element={<CartLayout />}>
          <Route index element={<Cart />} />
          <Route path="/cart/address" element={<Address />} />
          <Route path="/cart/delivery" element={<Delivery />} />
          <Route path="/cart/payment" element={<Payment />} />
          <Route path="/cart/complete" element={<OrderComplete />} />
        </Route>
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
