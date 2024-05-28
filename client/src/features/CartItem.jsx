import { FiMinus, FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import useStore from "../app/store";
import axios from "axios";
import { toast } from "react-toastify";

const CartItem = ({ p }) => {
  const [quantity, setQuantity] = useState(0);
  const [quantityToUpdate, setQuantityToUpdate] = useState(0);
  const user = useStore((state) => state.user);
  const setCart = useStore((state) => state.setCart);

  const notify = () => toast.success("Sepet güncellendi");

  useEffect(() => {
    setQuantity(p.quantity);
    setQuantityToUpdate(p.quantity);
  }, []);

  useEffect(() => {
    setQuantityToUpdate(p.quantity);
  }, [p.quantity]);

  const addToCart = async (id, quantity) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/cart/${user._id}/${id}`,
      {
        quantity,
      }
    );

    if (response.status !== 200) return false;
    setCart(response.data.cart.products);
    notify();
  };

  const updateCartItem = async (id) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_SERVER_URL}/cart/${user._id}/${id}`,
      {
        quantity,
      }
    );

    if (response.status !== 200) return false;
    console.log(response.data);
    setCart(response.data.cart.products);
    notify();
  };

  const handlePlus = async (id) => {
    setQuantity((pre) => pre + 1);
    addToCart(id, 1);
  };

  const handleMinus = async (id) => {
    if (quantity > 1) {
      setQuantity((pre) => pre - 1);
      addToCart(id, -1);
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/cart/${user._id}/${id}`
    );

    if (response.status !== 200) return false;
    console.log(response.data);
    setCart(response.data.cart.products);
    notify();
  };

  const handleChange = (e) => {
    let value = e.target.value;
    // if (!isNaN(value)) value = parseInt(value);
    // if (Number.isInteger(value) || "" || null) setQuantity(value);
    setQuantity(value);
  };

  const handleBlur = (e, id) => {
    if (e.target.value < 1 || "") {
      setQuantity(1);
    }
    console.log(quantity, quantityToUpdate);
    if (quantity !== quantityToUpdate) updateCartItem(id);
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-2 flex flex-row space-x-4 items-center justify-between">
      <div className="flex flex-row items-center">
        <button
          type="button"
          className="bg-rose-100 rounded-full p-1"
          onClick={() => handleDelete(p.product._id)}
        >
          <RiDeleteBinLine className=" text-rose-500" />
        </button>
        <img className="w-24 h-24" src={p.product.imagePath} />
        <div>
          <div className="text-sm">{p.product.name}</div>
          <div className="font-bold text-xs">{`${Intl.NumberFormat(
            "tr-TR",
            {}
          ).format(p.product.price * p.quantity)} ₺`}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          className="bg-gray-100 rounded-md w-14 h-6 flex justify-center items-center text-cyan-600"
          onClick={() => handlePlus(p.product._id)}
        >
          <FiPlus />
        </button>
        <input
          type="text"
          value={quantity}
          onChange={(e) => handleChange(e)}
          onFocus={() => setQuantityToUpdate(quantity)}
          onBlur={(e) => handleBlur(e, p.product._id)}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateCartItem(p.product._id);
          }}
          className="text-center form-input block w-14 rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-cyan-600 outline-none sm:text-sm sm:leading-6"
        />
        <button
          type="button"
          className="bg-gray-100 rounded-md w-14 h-6 flex justify-center items-center text-cyan-600"
          onClick={() => handleMinus(p.product._id)}
        >
          <FiMinus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
