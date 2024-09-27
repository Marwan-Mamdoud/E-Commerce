"use client";
import { ApiClint } from "@/lib/api-client";
import { GETMYORDER, MARKORDERASDELIVERED } from "@/lib/constant";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const getMyOrders = async () => {
    try {
      const data = await ApiClint(GETMYORDER);
      if (data.data) {
        setOrders(data.data.orders);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
  };
  const markOrderDelivered = async (id) => {
    try {
      const data = await ApiClint.put(`${MARKORDERASDELIVERED}/${id}`);
      if (data.data) {
        setOrders(data.data.orders);
        toast.success(data.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
    getMyOrders();
  };
  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <div className="w-full">
      <div className="mx-auto pt-32">
        <p className="ml-32 text-2xl mb-10">My Orders</p>
        <table className="w-full md:w-4/5 mx-auto">
          <thead>
            <tr>
              <th className="mx-4 my-2 text-left">ID</th>
              <th className="pr-16 my-2 text-left">NAME</th>
              <th className="mx-4 my-2 text-left">EMAIL</th>
              <th className="mx-4 my-2 text-center">TOTAL PRICE</th>
              <th className="mx-4 my-2 text-center">PAID</th>
              <th className="mx-4 my-2 text-center">DELIVERED</th>
              <th className="mx-4 my-2 text-center">DELIVERED</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td className=" ">
                  <Link href={`orders/${order._id}`}>{order._id}</Link>
                </td>
                <td className="ml-10 mr-8 my-2  text-left ">
                  <p>{order.user.username}</p>
                </td>
                <td className="">
                  <p className="">{order.user.email}</p>
                </td>
                <td className="px-4 py-4 text-center">{order.totalPrice}</td>
                <td className={`px-4 py-4 text-center`}>
                  <div
                    className={`px-2 py-2 rounded-full  ${
                      order.isPaid ? "bg-green-500" : "bg-red-500"
                    } `}
                  >
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </div>
                </td>
                <td className={`px-4 py-4 text-center `}>
                  <div
                    className={`px-2 py-2 rounded-full  ${
                      order.isDelivered ? "bg-green-500" : "bg-red-500"
                    } `}
                  >
                    {order.isDelivered ? "Delivered" : "Not Delevired"}
                  </div>
                </td>
                <td
                  onClick={() => markOrderDelivered(order._id)}
                  className="px-4 py-4 text-center font-bold font-mono text-xl cursor-pointer"
                >
                  Delivered
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
