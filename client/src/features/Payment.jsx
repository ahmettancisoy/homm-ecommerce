import { useEffect } from "react";
import useStore from "../app/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const user = useStore((state) => state.user);
  const setStatus = useStore((state) => state.setStatus);

  const navigate = useNavigate();

  useEffect(() => {
    setStatus(4);
  }, []);

  const totalAmount = () => {
    const total = cart.reduce((a, b) => a + b.product.price * b.quantity, 0);
    const localPrice = total.toLocaleString("tr-TR");
    return localPrice;
  };

  const handleContinue = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/delivery/confirm/${user._id}`
    );

    console.log(response.data);

    if (response.status !== 200) return false;

    setCart([]);

    navigate("/cart/complete");
  };

  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-xl">{`Sepet tutarı: ${
          cart.length > 0 ? totalAmount() : 0
        } ₺`}</span>
        <button
          onClick={() => handleContinue()}
          className="bg-orange-600 hover:bg-orange-500 transition-colors text-white p-2 rounded-lg"
        >
          Satın Alımı Onayla
        </button>
      </div>
    </div>
  );
};

export default Payment;
