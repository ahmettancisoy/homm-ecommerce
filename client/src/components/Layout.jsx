import { Outlet, useNavigate, NavLink } from "react-router-dom";
import Menu from "./Menu";
import { FaUserCircle } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import useStore from "../app/store";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setCart = useStore((state) => state.setCart);

  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth`);

    if (response.status !== 200) return false;
    const currentUser = response.data[0];
    setUser(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  };

  const getCartData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/cart/${user._id}`
      );
      if (response.status !== 200) setCart([]);
      const cart = response.data;
      setCart(cart.products);
    } catch (error) {
      setCart([]);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) getUsers();
    if (user) setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    if (user) getCartData();
  }, [user]);

  return (
    <div className="w-screen h-screen bg-slate-100">
      <div className="flex flex-col h-full">
        <div className="bg-white py-2 px-4 flex flex-row space-x-8 justify-end shadow-sm items-center text-sm">
          <NavLink to="/orders">Siparişlerim</NavLink>
          <NavLink
            className="flex flex-row space-x-4 items-center"
            type="button"
            to="/users"
          >
            <div>{user.fullName}</div>
            {user ? (
              <img
                src={user.avatarPath}
                className="w-8 h-8 rounded-full overflow-hidden"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 text-gray-400" />
            )}
          </NavLink>
        </div>
        <Menu />
        <div className="overflow-auto scrollbar z-20 justify-center flex">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Layout;
