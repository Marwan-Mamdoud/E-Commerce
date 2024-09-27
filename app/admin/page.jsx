"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  try {
    const user = localStorage.getItem("userInfo");
    if (!user) {
      router.push("/loggin");
      throw new Error("You are not loggin");
    }
    return <h1>admin</h1>;
  } catch (error) {
    toast.error(
      `${error.message || error.response.data || error?.data?.message}`
    );
  }
};

export default Page;
