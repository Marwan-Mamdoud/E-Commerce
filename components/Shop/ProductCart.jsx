import { ApiClint } from "@/lib/api-client";
import { ADDTOCART, HOST, UPDATEPROFILE } from "@/lib/constant";
import { useAppStore } from "@/store";
import Link from "next/link";
import React from "react";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCart = ({ product }) => {
  const { setCart } = useAppStore();
  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiClint.post(`${ADDTOCART}/${product._id}`);
      if (res.data) {
        const user = await ApiClint.get(UPDATEPROFILE);
        localStorage.setItem("userInfo", JSON.stringify(user.data.user));
        localStorage.setItem("Cart", JSON.stringify(user.data.user.cart));
        setCart(user.data.user.cart);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
  };

  return (
    <div className="w-full  h-full">
      <div className="w-full relative mb-2 rounded-t-lg bg-white  mx-auto h-44">
        <img
          src={HOST + product.image}
          className="w-fit mx-auto object-cover  h-full"
          alt={product.name}
        />
        <HeartIcon product={product} />
        <span className="absolute bottom-3 right-3 rounded-full bg-black text-white py-0.5 px-2.5 font-bold text-sm ">
          {product.brand}
        </span>
      </div>
      <div className="bg-gray-800  rounded-b-lg">
        <div className="flex px-4  items-center justify-between">
          <p className="text-lg ">{product.name}</p>
          <p className="text-pink-600 font-semibold">$ {product.price}.00</p>
        </div>
        <div className="pb-4">
          <p className="text-gray-400 font-sans px-5 ">{product.description}</p>
        </div>
        <div className="px-5 flex items-center justify-between pb-4">
          <Link
            href={`/shop/${product._id}`}
            className="px-5 py-1 text-lg font-semibold bg-pink-600 rounded-lg"
          >
            Read more
          </Link>
          <button onClick={addToCart} className="text-xl">
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
