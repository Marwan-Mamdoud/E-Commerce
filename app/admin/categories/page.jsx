"use client";
import { ApiClint } from "@/lib/api-client";
import {
  CREATECATEGORY,
  DELETECATEGORY,
  GETALLCATEGORIES,
  UPDATECATEGORY,
} from "@/lib/constant";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryAdded, setCategoryAdded] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedUpdatedCategory, setSelectedUpdatedCategory] = useState();
  const [openModel, setOpenModel] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const search = usePathname();

  const getCategories = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const data = await ApiClint(GETALLCATEGORIES);
      if (!user) {
        router.push("/loggin");
        throw new Error("you are not loggin");
      }
      if (!user.isAdmin) {
        router.push("/shop");
        throw new Error("You are not admin");
      }
      if (data) {
        setCategories(data.data.categories);
        // toast.success("done get all categories");
      }
      console.log(data.data.categories, "categories");
    } catch (error) {
      toast.error(error.message || error.response.data);
    }
  };

  useEffect(() => {
    getCategories();
    setLoading(false);
  }, [loading]);

  const deleteUser = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        router.push("/loggin");
        throw new Error("you are not loggin");
      }
      if (!user.isAdmin) {
        router.push("/shop");
        throw new Error("You are not admin");
      }
      const data = await ApiClint.delete(`${DELETECATEGORY}/${id}`);
      if (data) {
        location.reload();
        toast.success("Done Delete Ctegory");
      }
    } catch (error) {
      toast.error(error.message || error.response.data);
    }
  };

  const addCategory = async (e) => {
    try {
      e.preventDefault();
      console.log(categoryAdded);

      const data = await ApiClint.post(CREATECATEGORY, { name: categoryAdded });
      if (data) {
        setCategoryAdded("");
        location.reload();
        toast.success("Done Add Category");
      }
    } catch (error) {
      toast.error(error.response.data || error.message);
    }
  };

  const setModel = async (item) => {
    setSelectedCategory(item);
    setOpenModel(!openModel);
    console.log(openModel, selectedCategory, "test");
  };

  const UpdateCategory = async (e) => {
    try {
      e.preventDefault();
      const data = await ApiClint.put(
        `${UPDATECATEGORY}/${selectedCategory._id}`,
        { name: selectedUpdatedCategory }
      );
      if (data) {
        setOpenModel(false);
        toast.success("Done Update Category");
        console.log(data);
      }
    } catch (error) {
      toast.error(error.response.data || error.message);
    }
  };

  return (
    <>
      <div className=" fixed  top-10 right-10 cursor-pointer">
        <div
          className="text-2xl text-white"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div className="text-2xl text-white">
            <div
              className={` w-8 h-1 bg-white mb-1 ${
                openMenu
                  ? "translate-y-[0.5rem] rotate-45 transform duration-300"
                  : "-translate-y-[0.25rem] duration-300"
              } `}
            ></div>
            <div
              className={`w-8 h-1 bg-white mb-1 ${
                openMenu ? "rotate-45 duration-300 " : "duration-300"
              }`}
            ></div>
            <div
              className={`h-1 w-8 bg-white mb-1 ${
                openMenu
                  ? "-translate-y-[0.5rem] -rotate-45 transform duration-300"
                  : "translate-y-[0.25rem]   transform duration-300"
              }`}
            ></div>
          </div>
        </div>
        {openMenu && (
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
      <div className="h-[100vh] w-full mx-auto flex flex-col gap-4 items-center justify-center">
        <h1 className="text-3xl">Categories</h1>
        {loading
          ? "Loading.."
          : categories.map((item) => (
              <table
                key={item.name}
                className="w-full  items-center md:w-4/5 mx-auto"
              >
                <tbody>
                  <tr>
                    <td className="text-left  bg-black  ">
                      <button
                        key={item._id}
                        onClick={() => setModel(item)}
                        // onClick={() => console.log(item)}
                        className="text-xl  rounded-xl border-sky-500 border-2 w-fit px-6 py-3 cursor-pointer hover:bg-sky-500 hover:text-stone-50 text-sky-500 font-semibold"
                      >
                        {item.name}
                      </button>
                    </td>

                    <td className="text-right mx-4 my-2">
                      {" "}
                      <button onClick={() => deleteUser(item._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
        <form onSubmit={addCategory} className="flex gap-5  mx-auto">
          <input
            type="text"
            value={categoryAdded}
            onChange={(e) => {
              setCategoryAdded(e.target.value);
            }}
            className=" h-14 w-96 outline-none bg-slate-700 border-2 pl-3 rounded-xl border-white"
          />
          <button
            type="submit"
            className="bg-pink-500 rounded-xl py-4 w-40 hover:bg-pink-700"
          >
            Add Category
          </button>
        </form>
        {openModel && (
          <div className="fixed  items-center justify-center  inset-0 flex backdrop-blur-sm">
            <div className=" top-[40%] left-[30%] p-5 rounded-lg   text-right">
              <button
                className="mr-2 mb-3 text-red-700 font-bold text-2xl focus:outline-none"
                onClick={() => setOpenModel(!openModel)}
              >
                X
              </button>
              <form onSubmit={UpdateCategory} className=" flex gap-5 mx-auto">
                <input
                  type="text"
                  placeholder={selectedCategory.name}
                  onChange={(e) => {
                    setSelectedUpdatedCategory(e.target.value);
                  }}
                  className=" h-14 w-96 outline-none bg-slate-700 border-2 pl-3 rounded-xl border-white"
                />
                <button
                  type="submit"
                  className="bg-pink-500 rounded-xl py-4 w-40 hover:bg-pink-700"
                >
                  Update Category
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
