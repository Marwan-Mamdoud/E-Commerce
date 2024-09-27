"use client";
import { ApiClint } from "@/lib/api-client";
import UsersList from "@/components/Admin/UsersList";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { DELETEUSER, GETALLUSERS } from "@/lib/constant";
import { toast } from "react-toastify";
import { getAllUsers } from "@/lib/apiRoutes";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Link from "next/link";
// import GetUsers from "@/lib/GetUsers";

const Page = () => {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const search = usePathname();

  const getdata = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        router.push("/loggin");
      }
      if (!user.isAdmin) {
        router.push("/shop");
      }
      const data = await ApiClint(GETALLUSERS);
      if (data.data) {
        console.log("all users");
        setAllUsers(data.data.allUsers);
      }
    } catch (error) {
      setIsloading(false);
      toast.error(error.messae);
    }
  };

  useEffect(() => {
    getdata();
    setIsloading(false);
  }, []);

  const deleteUser = async (id) => {
    try {
      if (window.confirm(`Are user sure?!`)) {
        const data = await ApiClint.delete(`${DELETEUSER}/${id}`);
        if (data) {
          toast.success("Done Delete User..");
        }
      }
    } catch (error) {
      toast.error(error.message || error.response.data);
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
      <section className="p-4">
        <h1 className="text-2xl font-semibold mb-5">Users</h1>
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="mx-4 my-2 text-left">ID</th>
                <th className="pr-16 my-2 text-left">NAME</th>
                <th className="mx-4 my-2 text-left">EMAIL</th>
                <th className="mx-4 my-2 text-center">ADMIN</th>
                <th className="mx-4 my-2 text-center">DELETE</th>
                <th className="mx-4 my-2 text-center">EDIT</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td className=" ">{user._id}</td>
                  <td className="ml-10 mr-8 my-2  text-left ">
                    <p>{user.username}</p>
                  </td>
                  <td className="">
                    <p className="">{user.email}</p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {user.isAdmin ? (
                      <button>
                        <FaCheck style={{ color: "green " }} />
                      </button>
                    ) : (
                      <button>
                        <FaTimes style={{ color: "red" }} />
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {user.isAdmin ? (
                      ""
                    ) : (
                      <button onClick={() => deleteUser(user._id)}>
                        <FaTrash />
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button>
                      <Link href={`/admin/users/${user._id}`}>
                        <FaEdit className="cursor-pointer" />
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Page;
