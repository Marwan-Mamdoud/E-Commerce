"use client";
import { ApiClint } from "@/lib/api-client";
import { GETMyORDER, HOST, MARKORDERASPAID } from "@/lib/constant";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const [order, setOrder] = useState(null);

  const orderHundler = async () => {
    try {
      const paid = await ApiClint.put(`${MARKORDERASPAID}/${params.orderId}`);
      if (paid.data) {
        toast.success(paid.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
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
    // }
  };

  const getMyOrder = async () => {
    try {
      console.log(params.orderId);

      const data = await ApiClint(`${GETMyORDER}/${params.orderId}`);
      if (data.data) {
        setOrder(data.data.order);
        console.log(data.data.order);
      }
    } catch (error) {
      toast.error(error?.response?.data);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMyOrder();
  }, []);
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Ada4XH4vO3Aik8aAErNSHHoWCPUe3RmmwdiA7YInFDTYDz9raKSpDEIHrdnrpaYQvO0TqfEZVocJ0U2k",
      }}
    >
      {/* <usePayPalScriptReducer> */}
      <div className="w-full h-[100vh]">
        <div className=" flex items-start justify-start  pt-10">
          <table className="w-fit border md:w-4/5 ml-32">
            <thead className="border">
              <tr>
                <th className="mx-4 my-2 text-center">IMAGE</th>
                <th className="mx-4 my-2 text-center">PRODUCT</th>
                <th className="mx-4 my-2 text-center">QUANTITY</th>
                <th className="mx-4 my-2 text-center">UNIT PRICE</th>
                <th className="mx-4 my-2 text-center">PRICE</th>
              </tr>
            </thead>

            <tbody className="border">
              {order?.orderItems.map((item) => (
                <tr key={HOST + item.image}>
                  <td className="text-center ">
                    <img
                      className="h-14  ml-10 mt-5  w-14 mb-5 object-cover"
                      src={HOST + item.image}
                      alt={item.name}
                    />
                  </td>
                  <td className="ml-10 mr-8  text-center ">
                    <p>{item.name}</p>
                  </td>
                  <td className="text-center">
                    <p className="">{item.quantity}</p>
                  </td>
                  <td className="px-4 text-center">{item.price}</td>
                  <td className={`px-4 text-center`}>
                    {item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col pb-10 pt-2 px-10 gap-5 mr-52 w-[50rem] bg-black rounded-xl ">
            <h1 className="text-2xl font-bold">Shipping</h1>
            <h1 className="text-xl ml-5 font-bold">
              <span className="text-pink-600">Order: </span> {order?._id}
            </h1>
            <h1 className="text-xl ml-5 font-bold">
              <span className="text-pink-600">Name: </span>{" "}
              {order?.user.username}
            </h1>
            <h1 className="text-xl ml-5 font-bold">
              <span className="text-pink-600">Email: </span> {order?.user.email}
            </h1>
            <h1 className="text-xl ml-5 font-bold">
              <span className="text-pink-600">Address: </span>{" "}
              {order?.shippingAddress.country}-{order?.shippingAddress.city}-
              {order?.shippingAddress.address}
            </h1>
            <h1 className="text-xl ml-5 font-bold">
              <span className="text-pink-600">Mathod: </span>{" "}
              {order?.paymentMethod}
            </h1>
            <h1 className={`bg-slate-500 w-full py-6 pl-5 text-xl`}>
              {!order?.isPaid ? "Not Paid" : "Paid At: " + order.updatedAt}
            </h1>
            <div className="flex flex-col pb-2 pt-5  gap-5  bg-black rounded-xl ">
              <h1 className="text-2xl font-bold">Order Summery</h1>
              <h1 className="text-xl ml-5 font-bold">
                Items Price: $ {order?.itemsPrice}
              </h1>
              <h1 className="text-xl ml-5 font-bold">
                Shipping: $ {order?.shippingPrice}
              </h1>
              <h1 className="text-xl ml-5 font-bold">
                Tax Price $ {order?.taxPrice}
              </h1>
              <h1 className="text-xl ml-5 font-bold">
                Total Price: $ {order?.totalPrice}
              </h1>
            </div>

            {!order?.isPaid && (
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: order?.totalPrice, // المبلغ المطلوب
                        },
                      },
                    ],
                  });
                }}
                onApprove={orderHundler}
                className=" w-full h-16 font-mono font-semibold text-2xl rounded-lg  "
              >
                Order
              </PayPalButtons>
            )}
          </div>
        </div>
      </div>
      {/* </usePayPalScriptReducer> */}
    </PayPalScriptProvider>
  );
};

export default Page;
