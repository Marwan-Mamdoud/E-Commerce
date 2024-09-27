"use client";
import { getAllUsers } from "@/lib/apiRoutes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAd, FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const UsersList = async () => {
  const router = useRouter();
  // const user = JSON.parse(localStorage.getItem("userInfo"));
  const [isLoading, setIsLoading] = useState(false);
  // let users;
  setIsLoading(true);
  const users = await getAllUsers();
  // const getusers = async () => {
  //   try {
  // setIsLoading(true);
  // const data = await ApiClint(GETALLUSERS);
  // if (data) {
  //   users = data.data.allUsers;
  //   console.log(users);
  // }
  // setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(
  //       `${error.message || error.response.data || error?.data?.message}`
  //     );
  //   }
  // };
  // useEffect(async () => {
  //   getusers();
  // }, []);
  setIsLoading(false);
};

export default UsersList;
