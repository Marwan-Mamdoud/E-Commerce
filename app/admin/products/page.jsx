"use client";
import { ApiClint } from "@/lib/api-client";
import { DELETEPRODUCT, GETALLPRODUCT, HOST } from "@/lib/constant";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [products, setProducts] = useState();
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const search = usePathname();
  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await ApiClint(GETALLPRODUCT);
      if (res.data.products) {
        setProducts(res.data.products);
      }
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  useEffect(() => {
    getProducts();
    setLoading(false);
  }, []);

  const DeleteProduct = async (id) => {
    try {
      const res = await ApiClint.delete(`${DELETEPRODUCT}/${id}`);
      if (res) {
        router.push("/admin/products");
        toast.success(`Done Delete Product Successfully.`);
      }
    } catch (error) {
      toast.error(error?.response?.data);
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
      <div className="mx-[9rem] scroll-hidden">
        <div className="pl-32 pt-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-pink-500 font-semibold">
              All Product: {products?.length}{" "}
            </h1>
            <Link
              href="/admin/products/add-product"
              className={`bg-pink-500 rounded-xl py-4  w-1/6 hover:bg-pink-700 text-center  focus:bg-pink-800 text-xl my-[1rem] `}
            >
              Add Product
            </Link>
          </div>
          <div className="ml-40 mt-10 flex flex-col gap-3  items-center justify-start">
            {products?.map((prod) => {
              return (
                <>
                  --------------------------------------------------
                  <Link
                    key={prod._id}
                    href={`/admin/products/${prod._id}`}
                    className="flex items-center justify-around  w-full gap-10 my-5"
                  >
                    <div className="rounded-lg h-full">
                      <img
                        src={`${HOST}${prod.image}`}
                        alt={prod.image}
                        width={300}
                        // height={300}
                        className="rounded-lg h-full my-4 "
                      />
                    </div>
                    <div className="w-full flex gap-20 items-start">
                      <div className="flex items-start flex-col gap-20 ">
                        <p className="text-xl text-white font-semibold">
                          {prod.name}
                        </p>
                        <p className="text-lg text-gray-400 font-sans">
                          {prod.description}
                        </p>
                        <button
                          type="submit"
                          className={`bg-green-500 rounded-xl py-4 px-10  hover:bg-green-700  focus:bg-green-800 text-xl my-[1rem] `}
                        >
                          Update Product
                        </button>
                      </div>
                      <div className="flex flex-col items-end gap-20">
                        <p className="test-sm">
                          {moment(prod.updatedAt).format("MMMM Do YYYY")}
                        </p>
                        <p className="text-xl font-bold">$ {prod.price}</p>
                        <button
                          onClick={() => DeleteProduct(prod._id)}
                          type="submit"
                          className={`bg-red-500 rounded-xl py-4 px-10  hover:bg-red-700  focus:bg-red-800 text-xl my-[1rem] `}
                        >
                          Delete Product
                        </button>
                      </div>
                    </div>
                  </Link>
                  ----------------------------------------
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
