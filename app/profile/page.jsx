"use client";
import { ApiClint } from "@/lib/api-client";
import { UPDATEPROFILE } from "@/lib/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const auth = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        router.push("/loggin");
        throw new Error("You are not loggin.");
      }
      setEmail(user?.email);
      setUsername(user?.username);
    } catch (error) {
      toast.error(
        `${error.message || error.response.data || error?.data?.message}`
      );
    }
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    auth();
  }, []);
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!email) {
        throw new Error("email is require");
      }
      if (!username) {
        throw new Error("username is require");
      }
      // if (!password) {
      //   throw new Error("password is require");
      // }
      if (password !== passwordConfirm) {
        throw new Error("password and password confirm are not equal");
      }
      const res = await ApiClint.put(UPDATEPROFILE, {
        username,
        email,
        password,
      });
      if (res.data.user) {
        console.log(res);
        const updateduser = res.data.user;
        localStorage.setItem("userInfo", JSON.stringify(updateduser));
        toast.success("Profile Updated Successfully..");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        `${error.message || error.response.message || error?.data?.message}`
      );
    }
  };

  return (
    <div className="mx-auto  ">
      <div className="flex justify-center  items-center md:flex md:space-x-4">
        <div className="md:w-1/3 mt-20">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={updateProfile} className="">
            <div className="my-[4rem]">
              <input
                type="text"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Name"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <div className="my-[4rem]">
              <input
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <div className="my-[4rem]">
              <input
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your password"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <div className="my-[4rem]">
              <input
                type="password"
                value={passwordConfirm}
                name="confirmPassword"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Enter Your Confirm Password"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <div className="flex justify-between">
              <button
                disabled={isLoading}
                type="submit"
                className={`bg-pink-500 rounded-xl py-4 px-20 hover:bg-pink-700  ${
                  isLoading ? "cursor-wait" : ""
                } focus:bg-pink-800 text-xl my-[1rem] `}
              >
                {isLoading ? "Loading..." : "Update"}
              </button>
              <Link
                disabled={isLoading}
                href="/orders"
                className={`bg-pink-500 rounded-xl py-4 px-10 hover:bg-pink-700  focus:bg-pink-800 text-xl my-[1rem] `}
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
