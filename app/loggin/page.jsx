// import React from "react";
// import Loggin from "@/components/Auth/Loggin";
"use client";
import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { ApiClint } from "@/lib/api-client";
import { LOGGIN } from "@/lib/constant";
// import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
// import Image from "next/image";
const LoggIn = () => {
  const router = useRouter();
  const { userInfo, setUserInfo, setCart } = useAppStore.getState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loggin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await ApiClint.post(LOGGIN, { email, password });
      if (res.data.exist) {
        const user = res.data.exist;
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("Cart", JSON.stringify(user.cart));
        setUserInfo(user);
        setCart(user.cart);
        console.log(JSON.parse(localStorage.getItem("userInfo")));
        setIsLoading(false);
        toast.success("Done loggin succussfully.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error.response.data || error?.data?.message}`);
    }
  };
  useEffect(() => {
    if (userInfo) {
      router.push("/shop");
    }
  }, [userInfo]);
  return (
    <div className="">
      <section className="pl-[15rem] h-[100vh] flex ">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={loggin} className="w-[40rem] ">
            <div className="my-[4rem]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <div className="my-[4rem]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className={`bg-pink-500 rounded-xl py-4 px-20 hover:bg-pink-700  focus:bg-pink-800 text-xl my-[1rem] `}
            >
              {isLoading ? "Loadign..." : "Sign In"}
            </button>
          </form>
          <div className="flex gap-1 items-center justify-start mt-2">
            <h1 className="text-sm">Dont have an account? </h1>
            <Link className="text-pink-600" href="/register">
              Register
            </Link>
          </div>
        </div>
        <img
          className="w-[49%] mr-10 h-full xl:block sm:hidden md:hidden"
          alt="loggin"
          src="https://images.unsplash.com/photo-1723591808749-e05a287b9ef3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D"
        />
      </section>
    </div>
  );
};

export default LoggIn;
