"use client";
import { useAppStore } from "@/store";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { ApiClint } from "@/lib/api-client";
import { REGISTER } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useAppStore();
  const router = useRouter();
  const register = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = new FormData(e.currentTarget);
      const res = await ApiClint.post(REGISTER, {
        username,
        email,
        password,
        passwordConfirm,
      });
      if (!res) {
        res.status(400);
      }
      if (res.data.user) {
        const user = res.data.user;
        console.log(user);
        localStorage.setItem("userInfo", JSON.stringify(user));
        setUserInfo(user);
        router.push("/shop");
      }
      // console.log(...data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`Error register hundler: ${error}`);
      toast.error(`${error.response.data || error?.data?.message}`);
    }
  };
  return (
    <div className="">
      <section className="pl-[15rem] h-[100vh] flex ">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <form onSubmit={register} className="w-[40rem] ">
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
                placeholder="Enter Your Password"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <div className="my-[4rem]">
              <input
                type="password"
                value={passwordConfirm}
                name="passwordConfirm"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Enter Your Confirm Password"
                className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className={`bg-pink-500 rounded-xl py-4 px-20 hover:bg-pink-700  focus:bg-pink-800 text-xl my-[1rem] `}
            >
              {isLoading ? "Loadign..." : "Register"}
            </button>
          </form>
          <div className="flex gap-1 items-center justify-start mt-2">
            <h1 className="text-sm">Already have an account? </h1>
            <Link className="text-pink-600" href="/loggin">
              Logg In
            </Link>
          </div>
        </div>
        <img
          className="w-[49%] mr-10 xl:block sm:hidden md:hidden "
          alt="loggin"
          src="https://images.unsplash.com/photo-1632283409723-4cd4560e0857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
        />
      </section>
    </div>
  );
};

export default Register;
