import { TbTruckDelivery } from "react-icons/tb";
import { FaRegCreditCard } from "react-icons/fa6";
import { PiMapPinAreaBold } from "react-icons/pi";
import { CgShoppingBag } from "react-icons/cg";
import { Outlet } from "react-router-dom";
import useStore from "../app/store";
import { useEffect, useState } from "react";

const CartLayout = () => {
  const status = useStore((state) => state.status);
  const [statusWidth, setStatusWidth] = useState("w-[0%]");

  const getStatusWidth = () => {
    switch (status) {
      case 1:
        setStatusWidth("w-[0%]");
        break;
      case 2:
        setStatusWidth("w-[35%]");
        break;
      case 3:
        setStatusWidth("w-[65%]");
        break;
      case 4:
        setStatusWidth("w-full");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getStatusWidth();
  }, [status]);

  return (
    <div className="flex flex-col w-full max-w-[56rem] px-6 pt-12 pb-4 gap-4 text-gray-700 item">
      <div className="pb-2 flex self-center">
        <div className="w-fit flex flex-row gap-24 justify-center items-center relative">
          <div className="rounded-full bg-cyan-600 text-white w-8 h-8 items-center flex justify-center p-1.5 z-10">
            <CgShoppingBag />
          </div>
          <div
            className={`rounded-full ${
              status > 1 ? "bg-cyan-600 text-white" : "bg-slate-200"
            } w-8 h-8 items-center flex justify-center p-1.5 z-10 transition-colors delay-300`}
          >
            <PiMapPinAreaBold />
          </div>
          <div
            className={`rounded-full ${
              status > 2 ? "bg-cyan-600 text-white" : "bg-slate-200"
            } w-8 h-8 items-center flex justify-center p-1.5 z-10 transition-colors delay-300`}
          >
            <TbTruckDelivery />
          </div>
          <div
            className={`rounded-full ${
              status > 3 ? "bg-cyan-600 text-white" : "bg-slate-200"
            } w-8 h-8 items-center flex justify-center p-1.5 z-10 transition-colors delay-300`}
          >
            <FaRegCreditCard />
          </div>
          <div className="absolute w-full border-b-2 top-1/2 left-1/2 -translate-x-1/2"></div>
          <div
            className={`absolute ${statusWidth} transition-all duration-500 border-b-2 border-cyan-500 top-1/2 left-0`}
          ></div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default CartLayout;
