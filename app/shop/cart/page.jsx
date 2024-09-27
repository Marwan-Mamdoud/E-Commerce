"use client";
import { ApiClint } from "@/lib/api-client";
import { ClearCart, HOST, RemoveFromCart, UPDATEPRODUCT } from "@/lib/constant";
import { useAppStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {
  const { Cart, setCart, setUserInfo, userInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const removeItemFromCart = async (productId) => {
    try {
      const res = await ApiClint.post(`${RemoveFromCart}/${productId}`);
      if (res.data) {
        setCart(res.data.user.cart);
        localStorage.setItem("Cart", JSON.stringify(res.data.user.cart));
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
  };

  const hundlerSubmit = async () => {
    try {
      // await Cart?.items?.map(async (item) => {
      //   const formData = new FormData();
      //   formData.append(
      //     "countInStock",
      //     item.product.countInStock - item.quantity
      //   );
      //   await ApiClint.put(`${UPDATEPRODUCT}/${item.product._id}`, formData);
      // });
      // const res = await ApiClint.post(ClearCart);
      // if (res.data) {
      //   setCart(res.data.user.cart);
      //   localStorage.setItem("Cart", JSON.stringify(res.data.user.cart));
      //   localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      //   toast.success(res.data.message);
      // }
      router.push("/shop/shipping");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("Cart")));
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="pt-20 ml-24">
        <div className="font-mono text-2xl">Shopping Cart</div>{" "}
        {Cart?.items?.length == 0 ? (
          <div className="ml-28 mt-16 flex flex-col gap-10">
            <div>No Product In Your Cart</div>
          </div>
        ) : (
          <div className="ml-28 mt-16 flex flex-col gap-10">
            {loading
              ? "Loading..."
              : Cart.items.map((i) => (
                  <div key={i.product._id} className="flex items-center pb-3 ">
                    <div className="w-24 h-24">
                      <img
                        src={HOST + i.product.image}
                        className="rounded w-full h-full object-cover"
                        alt={i.product.name}
                      />
                    </div>
                    <div className="flex-1 ml-4 text-pink-500 font-mono">
                      <Link href={`/shop/${i.product._id}`}>
                        {i.product.name}
                      </Link>
                      <div className="mt-2 text-white">{i.product.brand}</div>
                      <div className="mt-2 text-white font-bold">
                        $ {i.product.price}
                      </div>
                    </div>
                    <div className="flex gap-20 mr-10">
                      <div className="bg-pink-500 w-10 h-10 flex justify-center text-2xl  text-white font-bold rounded-full items-center">
                        {i.quantity}
                      </div>
                      <div className="bg-pink-500 w-fit px-2 h-10  flex justify-center text-2xl  text-white font-bold rounded items-center">
                        $ {i.product.price * i.quantity}
                      </div>
                      <div
                        onClick={() => removeItemFromCart(i.product._id)}
                        className="cursor-pointer w-10 h-10 bg-red-800 flex justify-center text-2xl mr-20 text-white font-bold rounded-full items-center"
                      >
                        <FaTrash className="text-white" />
                      </div>
                    </div>
                  </div>
                ))}
            <div className="flex items-center justify-between">
              <div className="ml-10 text-2xl p-3 rounded bg-pink-300 font-semibold">
                Items:{" "}
                <span className="text-pink-500 font-bold">
                  {Cart?.items?.reduce((acc, item) => item.quantity + acc, 0)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold bg-pink-300 rounded p-3 text-2xl mr-20">
                  Items Price:{" "}
                  <span className="text-pink-500 font-bold">
                    $ {Cart?.itemsPrice}
                  </span>
                </div>
                <div className="font-semibold bg-pink-300 rounded p-3 text-2xl mr-20">
                  Tax Price:{" "}
                  <span className="text-pink-500 font-bold">
                    $ {Cart?.taxPrice}
                  </span>
                </div>
                <div className="font-semibold bg-pink-300 rounded p-3 text-2xl mr-20">
                  Total Price:{" "}
                  <span className="text-pink-500 font-bold">
                    $ {Cart?.totalPrice}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/shop/cart/shipping"
              className=" bg-pink-500 rounded text-3xl mb-4 text-center text-white p-2 w-1/4 cursor-pointer "
            >
              Proceed To Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
