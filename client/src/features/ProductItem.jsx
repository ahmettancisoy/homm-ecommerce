import { FaShoppingBasket } from "react-icons/fa";
import axios from "axios";
import useStore from "../app/store";
import { toast } from "react-toastify";

const ProductItem = ({ data }) => {
  const user = useStore((state) => state.user);
  const setCart = useStore((state) => state.setCart);
  const notify = () => toast.success("Sepete eklendi");

  const addToCart = async (product, e) => {
    e.stopPropagation();

    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/cart/${user._id}/${product._id}`,
      {
        quantity: 1,
      }
    );

    if (response.status !== 200) return false;
    console.log(response.data);
    setCart(response.data.cart.products);
    notify();
  };

  const showDetails = () => {
    console.log(data.description);
  };

  return (
    <div
      className="bg-white w-56 rounded-lg shadow-sm p-2 space-y-2 container"
      onClick={showDetails}
    >
      <img src={data.imagePath} className="cursor-pointer" />
      <div className="text-xs text-gray-800">{data.name}</div>
      <div className="text-cyan-600 text-sm font-bold">{`${data.price.toLocaleString(
        "tr-TR"
      )} ₺`}</div>
      <div className="pt-6">
        <button
          type="button"
          className="w-full bg-orange-500 p-2 rounded-md hover:bg-orange-600 transition-colors"
          onClick={(e) => addToCart(data, e)}
        >
          <div className="flex flex-row items-center text-center justify-center space-x-2 text-white">
            <FaShoppingBasket />
            <span>Sepete Ekle</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
