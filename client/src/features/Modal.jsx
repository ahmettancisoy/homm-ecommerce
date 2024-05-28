import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import ComboList from "./ComboList";
import { cities, getDistricts } from "../assets/cityAndDistricts";
import { useEffect, useState, useRef, Fragment } from "react";
import useStore from "../app/store";
import axios from "axios";

export default function Modal({
  open,
  setOpen,
  setSelectedAddress,
  setAddresses,
}) {
  const user = useStore((state) => state.user);

  const titleInputRef = useRef(null);

  const [address, setAddress] = useState({
    user: "",
    title: "",
    cityId: "1",
    districtId: "1757",
    address: "",
  });

  const filteredDistrict = getDistricts(address.cityId).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  useEffect(() => {
    setAddress((pre) => ({ ...pre, districtId: filteredDistrict[0].id }));
  }, [address.cityId]);

  useEffect(() => {
    if (open && titleInputRef.current) {
      titleInputRef.current.focus();
    }

    if (open) {
      setAddress((pre) => ({
        ...pre,
        districtId: filteredDistrict[0].id,
        user: user._id,
        title: "",
        address: "",
      }));
    }
  }, [open]);

  const setCityId = (city) => {
    if (city) {
      const foundCity = cities.find((f) => f.id === city.id);
      setAddress((pre) => ({ ...pre, cityId: foundCity.id }));
    }
  };

  const setDistrictId = (district) => {
    if (district) {
      const foundDistrict = filteredDistrict.find((f) => f.id === district.id);
      setAddress((pre) => ({ ...pre, districtId: foundDistrict.id }));
    }
  };

  const save = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/address/${user._id}`,
      { details: address }
    );
    setAddresses((pre) => [...pre, response.data]);
    setSelectedAddress(response.data);
    setOpen(false);
  };

  return (
    <Transition
      show={open}
      as={Fragment}
      afterEnter={() => {
        if (titleInputRef.current) {
          titleInputRef.current.focus();
        }
      }}
    >
      <Dialog className="relative z-50" onClose={() => setOpen(false)}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6">
                <DialogTitle className="pb-4">Teslimat Adresiniz</DialogTitle>
                <div className="flex flex-col gap-6">
                  <div>
                    <label htmlFor="title" className="text-xs font-medium">
                      Başlık
                    </label>
                    <input
                      id="title"
                      ref={titleInputRef}
                      value={address.title}
                      onChange={(e) =>
                        setAddress((pre) => ({ ...pre, title: e.target.value }))
                      }
                      type="text"
                      className="rounded-lg outline-none py-1.5 pr-8 pl-3 text-sm/6 border focus:border-cyan-600 block w-full"
                    />
                  </div>
                  <ComboList
                    title="Şehir"
                    inputId="city"
                    data={cities.sort((a, b) => {
                      return a.name.localeCompare(b.name);
                    })}
                    selected={cities.find((f) => address.cityId === f.id)}
                    setSelected={setCityId}
                  />

                  <ComboList
                    title="İlçe"
                    inputId="district"
                    data={filteredDistrict}
                    selected={
                      filteredDistrict.find(
                        (f) => address.districtId === f.id
                      ) || filteredDistrict[0]
                    }
                    setSelected={setDistrictId}
                  />
                  <div>
                    <label htmlFor="address" className="text-xs font-medium">
                      Adres
                    </label>
                    <textarea
                      id="address"
                      rows={4}
                      className="rounded-lg outline-none py-1.5 pr-8 pl-3 text-sm/6 border focus:border-cyan-600 block w-full"
                      value={address.address}
                      onChange={(e) =>
                        setAddress((pre) => ({
                          ...pre,
                          address: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="py-3 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="transition-colors inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                    onClick={() => save()}
                  >
                    Kaydet
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
