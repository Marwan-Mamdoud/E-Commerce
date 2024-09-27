"use client";
import ProccesProgress from "@/components/Shop/ProccesProgress";
import { ApiClint } from "@/lib/api-client";
import {
  ClearCart,
  CREATEORDER,
  HOST,
  MARKORDERASPAID,
  UPDATEPRODUCT,
} from "@/lib/constant";
import { useAppStore } from "@/store";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const { setUserInfo, userInfo, Cart, setCart } = useAppStore();
  const [loading, setLoading] = useState(true);

  const orderHundler = async () => {
    try {
      const order = await ApiClint.post(CREATEORDER, {
        orderItems: Cart.items.map((item) => {
          return {
            name: item.product.name,
            quantity: item.quantity,
            image: item.product.image,
            price: item.product.price,
            product: item.product._id,
          };
        }),
        shippingAddress: Cart.shippingAddress,
        paymentMethod: Cart.paymentMethod,
      });
      if (order.data) {
        toast.success(order.data.message);
      }
      const paid = await ApiClint.put(
        `${MARKORDERASPAID}/${order.data.order._id}`
      );
      if (paid.data) {
        toast.success(paid.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
    await Cart?.items?.map(async (item) => {
      const formData = new FormData();
      formData.append(
        "countInStock",
        item.product.countInStock - item.quantity
      );
      await ApiClint.put(`${UPDATEPRODUCT}/${item.product._id}`, formData);
    });
    const res = await ApiClint.post(ClearCart);
    if (res.data) {
      setCart(res.data.user.cart);
      localStorage.setItem("Cart", JSON.stringify(res.data.user.cart));
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
    }
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("Cart")));
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    setLoading(false);
  }, []);

  if (Cart?.items.length < 1) {
    return <p>No Cart</p>;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Ada4XH4vO3Aik8aAErNSHHoWCPUe3RmmwdiA7YInFDTYDz9raKSpDEIHrdnrpaYQvO0TqfEZVocJ0U2k",
      }}
    >
      <usePayPalScriptReducer>
        <div className="w-full">
          <ProccesProgress step1 step2 />
          <div className="mx-auto mt-20 w-fit">
            {loading ? (
              "Loading..."
            ) : (
              <table className="w-[60rem] mx-auto">
                <thead className="">
                  <tr>
                    <td className="text-center">Image</td>
                    <td className="text-center">Product</td>
                    <td className="text-center">Quantity</td>
                    <td className="text-center">Price</td>
                    <td className="text-center">Total</td>
                  </tr>
                </thead>

                <tbody>
                  {Cart?.items.map((item) => (
                    <tr key={item.product.name}>
                      <td className="text-center">
                        <img
                          src={HOST + item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 mx-auto object-cover"
                        />
                      </td>
                      <td className="text-center">{item.product.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">
                        {item.product.price.toFixed(2)}
                      </td>
                      <td className="text-center">
                        {(item.product.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mt-20 text-2xl font-sans font-semibold">
              {" "}
              Order Summary{" "}
            </div>
            {loading ? (
              "Loading"
            ) : (
              <div className=" bg-[#151515] mt-4 py-4 w-full flex gap-80 px-5 items-start rounded-lg justify-around">
                <div className="flex flex-col gap-1">
                  <p>Items Price: $ {Cart?.itemsPrice.toFixed(2)}</p>
                  <p>Shipping Price: $ {Cart?.shippinigPrice || 0.0} </p>
                  <p>Tax Price: $ {Cart?.taxPrice}</p>
                  <p className="bg-slate-800 rounded-lg py-3 px-2 text-xl">
                    Total Price:{" "}
                    <span className="font-bold font-mono text-2xl">
                      $ {Cart?.totalPrice}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="mt-4 text-2xl font-sans font-semibold">
                    {" "}
                    Shipping Address{" "}
                  </div>
                  <div className="">
                    Address: {Cart?.shippingAddress.country}-
                    {Cart?.shippingAddress.city}-{Cart?.shippingAddress.address}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="mt-4 text-2xl font-sans font-semibold">
                    {" "}
                    Paymet Method{" "}
                  </div>
                  <div className="">Method: {Cart?.paymentMethod}</div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full h-60 flex items-center justify-center">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: Cart?.totalPrice, // المبلغ المطلوب
                      },
                    },
                  ],
                });
              }}
              onApprove={orderHundler}
              className=" w-1/3 h-16 font-mono font-semibold text-2xl rounded-lg my-5 "
            >
              Order
            </PayPalButtons>
          </div>
        </div>
      </usePayPalScriptReducer>
    </PayPalScriptProvider>
  );
};

export default Page;
