import { useEffect, useState } from "react";
import useStore from "../app/store";
import { FiPlus } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const setStatus = useStore((state) => state.setStatus);

  const [deliveryFirms, setDeliveryFirms] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setStatus(3);
  }, []);

  useEffect(() => {
    if (user._id) getDeliveryList();
  }, [user]);

  const totalAmount = () => {
    const total = cart.reduce((a, b) => a + b.product.price * b.quantity, 0);
    const localPrice = total.toLocaleString("tr-TR");
    return localPrice;
  };

  const getDeliveryList = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/delivery/firm`
    );

    setDeliveryFirms(response.data);
    setSelectedDelivery(response.data[0]);
  };

  const handleContinue = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/delivery/firm/${user._id}`,
      { selectedDelivery }
    );

    console.log(response.data);

    navigate("/cart/payment");
  };

  return (
    <div>
      <div className="bg-white rounded-md p-2 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-medium">Kargo Firması</span>
          <button
            type="button"
            className="bg-green-100 py-1 px-2 rounded-lg flex items-center space-x-1 text-green-800 hover:bg-green-200 hover:text-green-900 transition-colors text-sm"
            onClick={() => setOpen(true)}
          >
            <FiPlus />
            <span>Ekle</span>
          </button>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          {deliveryFirms.map((m) => (
            <div
              key={m._id}
              className={`border rounded-md p-4 cursor-pointer flex justify-between items-center transition-all ${
                selectedDelivery === m ? "border-cyan-600" : "border-gray-200"
              }`}
              onClick={() => setSelectedDelivery(m)}
            >
              <div className="w-32">
                <img src={m.logoPath} />
              </div>

              <FaCheck
                className={`text-cyan-600 w-8 h-8 bg-gray-200 rounded-full p-2 transition-all ${
                  selectedDelivery === m ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <span>{`Sepet tutarı: ${cart.length > 0 ? totalAmount() : 0} ₺`}</span>
        <button
          onClick={() => handleContinue()}
          className="bg-cyan-600 hover:bg-cyan-500 transition-colors text-white p-2 rounded-lg"
        >
          Devam
        </button>
      </div>
    </div>
  );
};

export default Delivery;
