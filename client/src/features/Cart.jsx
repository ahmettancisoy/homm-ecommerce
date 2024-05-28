import { useEffect } from "react";
import useStore from "../app/store";
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const setStatus = useStore((state) => state.setStatus);

  useEffect(() => {
    setStatus(1);
  }, []);

  const totalAmount = () => {
    const total = cart.reduce((a, b) => a + b.product.price * b.quantity, 0);
    const localPrice = total.toLocaleString("tr-TR");
    return localPrice;
  };

  return (
    <>
      {cart.length > 0 ? (
        cart.map((p) => <CartItem key={p._id} p={p} />)
      ) : (
        <div className="w-[53rem] bg-white shadow-sm rounded-md p-12 font-medium">
          Sepetiniz de hiç ürün yok
        </div>
      )}
      <div className="flex justify-between">
        <span>{`Sepet tutarı: ${cart.length > 0 ? totalAmount() : 0} ₺`}</span>
        {cart.length > 0 && (
          <NavLink
            to="/cart/address"
            className="bg-cyan-600 hover:bg-cyan-500 transition-colors text-white p-2 rounded-lg"
          >
            Devam
          </NavLink>
        )}
      </div>
    </>
  );
};

export default Cart;
