"use client";
import { ApiClint } from "@/lib/api-client";
// import { getUser } from "@/lib/apiRoutes";
import { GETUSER, UPDATEUSER } from "@/lib/constant";
import React from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [data, setData] = useState({});
  const router = useRouter();
  const [id, setId] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [isAdmin, setIsAdmin] = useState(Boolean);
  const [isLoading, setIsLoading] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const search = usePathname();
  // let user;
  useEffect(() => {
    const getdata = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!user) {
          router.push("/loggin");
          throw new Error("You are not loggin.");
        }
        if (!user.isAdmin) {
          router.push("/shop");
          throw new Error("You are not admin");
        }
        setIsLoading(true);
        const User = await ApiClint(`${GETUSER}/${params.updateUserId}`);
        setData(User.data.user);
        console.log(User);
        setId(User.data.user._id);
        setEmail(User.data.user.email);
        setUsername(User.data.user.username);
        setIsAdmin(User.data.user.isAdmin);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message || error?.response?.data);
      }
    };
    getdata();
  }, []);

  const updateProfile = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        router.push("/loggin");
        throw new Error("You are not loggin.");
      }
      if (!user.isAdmin) {
        router.push("/shop");
        throw new Error("You are not admin");
      }
      const data = await ApiClint.put(`${UPDATEUSER}/${params.updateUserId}`, {
        username,
        email,
        isAdmin,
      });
      if (data) {
        toast.success("Updated User Successfully..");
        router.push("/admin/users");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message || error?.response?.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" fixed  top-10 right-10 cursor-pointer">
        <div
          className="text-2xl text-white"
          onClick={() => setOpenModel(!openModel)}
        >
          <div className="text-2xl text-white">
            <div
              className={` w-8 h-1 bg-white mb-1 ${
                openModel
                  ? "translate-y-[0.5rem] rotate-45 transform duration-300"
                  : "-translate-y-[0.25rem] duration-300"
              } `}
            ></div>
            <div
              className={`w-8 h-1 bg-white mb-1 ${
                openModel ? "rotate-45 duration-300 " : "duration-300"
              }`}
            ></div>
            <div
              className={`h-1 w-8 bg-white mb-1 ${
                openModel
                  ? "-translate-y-[0.5rem] -rotate-45 transform duration-300"
                  : "translate-y-[0.25rem]   transform duration-300"
              }`}
            ></div>
          </div>
        </div>
        {openModel && (
          <div className="fixed top-16 right-16 w-fit h-fit rounded-lg bg-black border-2 flex flex-col items-center justify-center border-white">
            <Link
              href="/admin/users"
              className={`${
                search === "/admin/users" ? "text-yellow-200 bg-slate-500" : ""
              } border-none px-6 py-2 mx-6 my-2 text-xl rounded-lg font-mono text-white hover:border-2 hover:bg-slate-800  hover:border-white  duration-300`}
            >
              Users
            </Link>
            <Link
              href="/admin/products/add-product"
              className={`${
                search === "/admin/products/add-product"
                  ? "text-yellow-200 bg-slate-500"
                  : ""
              } border-none px-6 py-2  text-xl rounded-lg font-mono text-white hover:border-2 hover:bg-slate-800  hover:border-white  duration-300`}
            >
              Add Product
            </Link>
            <Link
              href="/admin/products"
              className={`${
                search === "/admin/products"
                  ? "text-yellow-200 bg-slate-500"
                  : ""
              } border-none px-6 py-2  text-xl rounded-lg font-mono text-white hover:border-2 hover:bg-slate-800  hover:border-white  duration-300`}
            >
              Products
            </Link>
            <Link
              href="/admin/categories"
              className={`${
                search === "/admin/categories"
                  ? "text-yellow-200 bg-slate-500"
                  : ""
              } border-none px-6 py-2  text-xl rounded-lg font-mono text-white hover:border-2 hover:bg-slate-800  hover:border-white  duration-300`}
            >
              Categories
            </Link>
            <Link
              href="/admin/dashboard"
              className={`${
                search === "/admin/dashboard"
                  ? "text-yellow-200 bg-slate-500"
                  : ""
              } border-none px-6 py-2  text-xl rounded-lg font-mono text-white hover:border-2 hover:bg-slate-800  hover:border-white  duration-300`}
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
      <div className="mx-auto  ">
        <div className="flex justify-center  items-center md:flex md:space-x-4">
          <div className="md:w-1/3 mt-20">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={updateProfile} className="">
              <div className="my-[4rem]">
                <input
                  type="text"
                  disabled
                  value={id}
                  name="id"
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter Your Name"
                  className="w-full  border-b-4 border-slate-600 bg-black h-10 placeholder:text-2xl placeholder:pl-2 focus:outline-none placeholder:text-slate-500/80 "
                />
              </div>
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
                <button
                  className={`${
                    isAdmin ? "bg-green-500" : "bg-red-500"
                  } w-1/3 rounded-xl py-4 px-10 font-bold text-white`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAdmin(!isAdmin);
                  }}
                >
                  {isAdmin ? "Admin" : "Not Admin"}
                </button>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
