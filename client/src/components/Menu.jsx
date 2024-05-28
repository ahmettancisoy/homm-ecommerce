import { NavLink } from "react-router-dom";
import { PiHandbagLight } from "react-icons/pi";
import useStore from "../app/store";

const Menu = () => {
  const cart = useStore((state) => state.cart);

  return (
    <div className="flex justify-center space-x-12 p-4 mt-4 text-lg font-medium">
      <NavLink to="/" className="relative flex flex-col justify-center">
        {({ isActive }) => (
          <>
            <span
              className={`${
                isActive ? "text-cyan-600" : "text-gray-800"
              } transition-colors`}
            >
              Ürünler
            </span>
            <div
              className={`border-b-2 border-b-cyan-600 absolute ${
                isActive ? "animate-expand-center" : "animate-shrink-center"
              }`}
            ></div>
          </>
        )}
      </NavLink>
      <NavLink
        to="/cart"
        className="relative flex flex-row items-center justify-center"
      >
        {({ isActive }) => (
          <>
            <span
              className={`${
                isActive ? "text-cyan-600" : "text-gray-800"
              } transition-colors`}
            >
              Sepet
            </span>
            <div className="absolute -right-12">
              <PiHandbagLight
                className={`w-10 h-10 transition-colors ${
                  isActive ? "text-cyan-600" : "text-gray-800"
                }`}
              />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-sm text-cyan-600">
                {cart.length}
              </span>
            </div>
            <div
              className={`border-b-2 border-b-cyan-600 absolute ${
                isActive ? "animate-expand-center" : "animate-shrink-center"
              }`}
            ></div>
          </>
        )}
      </NavLink>
    </div>
  );
};

export default Menu;
