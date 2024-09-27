"use client";
import ProccesProgress from "@/components/Shop/ProccesProgress";
import { ApiClint } from "@/lib/api-client";
import { ADDSHIPPINGADDRESS, GETUSER, UPDATEPROFILE } from "@/lib/constant";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const { setUserInfo, userInfo, Cart, setCart } = useAppStore();
  const router = useRouter();

  // const cart = JSON.parse(localStorage.getItem("Cart"));

  const [form, setFrom] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const addValue = (e) => {
    setFrom((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHundler = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiClint.post(ADDSHIPPINGADDRESS, form);
      if (res.data.user) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        localStorage.setItem("Cart", JSON.stringify(res.data.user.cart));
        toast.success(res.data.message);
      }
      router.push("/shop/cart/shipping/placeOrder");
    } catch (error) {
      toast.error(error?.response?.data);
      console.log(error.message);
    }
    console.log(form);
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("Cart")));
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  return (
    <div className="mx-auto">
      <ProccesProgress step1 />
      <div className="flex flex-wrap items-center justify-around pt-5">
        {Cart ? (
          <form onSubmit={submitHundler} className="w-[40rem]">
            <h1 className="text-2xl font-semibold font-mono mb-9">Shipping</h1>
            <div className="flex flex-col gap-3 ml-3">
              <label htmlFor="adderss" className="text-xl font-sans">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="w-[30rem] ml-4 p-2 border rounded-lg bg-black text-white/80"
                placeholder="Write Your Adderss"
                value={form.address}
                onChange={addValue}
              />
            </div>
            <div className="flex flex-col mt-3 gap-3 ml-3">
              <label htmlFor="adderss" className="text-xl font-sans">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="w-[30rem] ml-4 p-2 border rounded-lg bg-black text-white/80"
                placeholder="Write Your Adderss"
                value={form.country}
                onChange={addValue}
              />
            </div>
            <div className="flex flex-col mt-3 gap-3 ml-3">
              <label htmlFor="adderss" className="text-xl font-sans">
                Postal Code
              </label>
              <input
                type="number"
                name="postalCode"
                className="w-[30rem] ml-4 p-2 border rounded-lg bg-black text-white/80"
                placeholder="Write Your Adderss"
                value={form.postalCode}
                onChange={addValue}
              />
            </div>
            <div className="flex flex-col mt-3 gap-3 ml-3">
              <label htmlFor="adderss" className="text-xl font-sans">
                City
              </label>
              <input
                type="text"
                name="city"
                className="w-[30rem] ml-4 p-2 border rounded-lg bg-black text-white/80"
                placeholder="Write Your Adderss"
                value={form.city}
                onChange={addValue}
              />
            </div>
            <div className="flex flex-col items-start ml-2 gap-2 mt-4 ">
              <label
                htmlFor="paymentMethod"
                className="text-sm  text-slate-400"
              >
                Select Payment Method
              </label>
              <div className="flex gap-1.5 ml-5">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="form-radio text-pink-500"
                  checked
                />
                <span className="text-slate-400 font-sans ">PayPal</span>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-xl bg-pink-600 text-xl font-sans py-3 px-6 ml-7 w-[30rem]"
            >
              Add Address Shipping
            </button>
          </form>
        ) : (
          "loading........."
        )}
      </div>
    </div>
  );
};

export default Page;
