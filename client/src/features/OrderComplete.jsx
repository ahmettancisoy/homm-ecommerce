import React from "react";
import { NavLink } from "react-router-dom";

const OrderComplete = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-12 mt-8">
      <h1 className="text-4xl text-center pb-12">TEBRİKLER 🥳</h1>
      <div className="text-center">Siparişiniz oluşturulmuştur.</div>
      <div className="text-center">
        Sipariş durumunu
        <NavLink to="/orders" className="text-orange-600 underline mx-1">
          siparişlerim
        </NavLink>
        sayfasından kontrol edebilirsiniz.
      </div>
    </div>
  );
};

export default OrderComplete;
