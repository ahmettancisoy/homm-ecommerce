import { useEffect, useState } from "react";
import useStore from "../app/store";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Modal from "./Modal";
import axios from "axios";
import { getCity, getDistrict } from "../assets/cityAndDistricts";
import { FaCheck } from "react-icons/fa";

const Address = () => {
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const setStatus = useStore((state) => state.setStatus);

  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const navigate = useNavigate();

  const totalAmount = () => {
    const total = cart.reduce((a, b) => a + b.product.price * b.quantity, 0);
    const localPrice = total.toLocaleString("tr-TR");
    return localPrice;
  };

  const getAddressList = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/address/${user._id}`
    );

    setAddresses(response.data);
    setSelectedAddress(response.data[0]);
  };

  useEffect(() => {
    setStatus(2);
  }, []);

  useEffect(() => {
    if (user._id) getAddressList();
  }, [user]);

  const handleContinue = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/delivery/address/${user._id}`,
      { selectedAddress }
    );

    console.log(response.data);

    navigate("/cart/delivery");
  };

  return (
    <div>
      <div className="bg-white rounded-md p-2 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="font-medium">Teslimat Adresiniz</span>
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
          {addresses.map((m) => (
            <div
              key={m._id}
              className={`border rounded-md p-2 cursor-pointer flex justify-between items-center transition-all ${
                selectedAddress === m ? "border-cyan-600" : "border-gray-200"
              }`}
              onClick={() => setSelectedAddress(m)}
            >
              <div className="flex flex-col">
                <div className="font-medium">{m.title}</div>
                <div>{`${getDistrict(m.districtId).name} ${
                  getCity(m.cityId).name
                }`}</div>
                <div>{m.address}</div>
              </div>

              <FaCheck
                className={`text-cyan-600 w-8 h-8 bg-gray-200 rounded-full p-2 transition-all ${
                  selectedAddress === m ? "opacity-100" : "opacity-0"
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
      <Modal
        open={open}
        setOpen={setOpen}
        setAddresses={setAddresses}
        setSelectedAddress={setSelectedAddress}
      />
    </div>
  );
};

export default Address;
