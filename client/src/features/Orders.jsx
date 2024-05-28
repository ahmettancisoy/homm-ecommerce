import { useEffect, useState } from "react";
import useStore from "../app/store";
import axios from "axios";
import { getCity, getDistrict } from "../assets/cityAndDistricts";

const Orders = () => {
  const user = useStore((state) => state.user);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/order/${user._id}`
    );

    if (response.status !== 200) return false;
    setOrders(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    if (user) getOrders();
  }, [user]);

  return (
    <div className="m-16 min-w-[56rem]">
      <div className="text-lg font-medium">Siparişlerim</div>
      <div className="mt-8 flex flex-col gap-8 pb-12">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-md shadow-sm p-4 h-full w-full flex justify-between"
            >
              <div className="">
                {order.products.map((p) => (
                  <div key={p._id} className="flex">
                    <div className="flex w-full items-center">
                      <img src={p.product.imagePath} className="w-24" />
                      <div className="w-full text-sm">
                        <div className="font-medium">{p.product.name}</div>
                        <div>{`${p.quantity} Adet`}</div>
                        <div>{`${(p.price * p.quantity).toLocaleString(
                          "tr-TR"
                        )} ₺`}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 m-4">
                <img src={order.delivery.logoPath} className="w-24" />
                <div>
                  <div className="font-medium">{order.address.title}</div>
                  <div>{`${getDistrict(order.address.districtId).name} / ${
                    getCity(order.address.cityId).name
                  }`}</div>
                  <div>{order.address.address}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-[53rem] bg-white shadow-sm rounded-md p-12 font-medium">
            Siparişiniz yok
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
