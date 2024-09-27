"use client";
import { ApiClint } from "@/lib/api-client";
import {
  CREATEPRODUCT,
  GETALLCATEGORIES,
  HOST,
  UPLOADIMAGE,
} from "@/lib/constant";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [countInStock, setStock] = useState();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState("");
  const router = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const search = usePathname();

  useEffect(() => {
    const getCategory = async () => {
      const data = await ApiClint(GETALLCATEGORIES);
      if (data.data.categories) setCategories(data.data.categories);
      console.log(search, "search");
    };
    getCategory();
  }, []);

  const UploadImg = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    console.log(e.target.files[0]);

    try {
      formdata.append("image", e.target.files[0]);
      const res = await ApiClint.post(UPLOADIMAGE, formdata);
      if (res) {
        setImage(res.data.image);
        setImageUrl(res.data.image);
        console.log(HOST + res.data.image);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  const AddingProduct = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("countInStock", countInStock);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("quantity", quantity);
      const res = await ApiClint.post(CREATEPRODUCT, formData);
      console.log(res, "Data For Product.");
      if (res.data.product) {
        router.push("/admin/products");
        toast.success(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
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
      <div
        className=" xl:mx-[9rem] sm:mx-[0] "
        onClick={() => setOpenModel(false)}
      >
        <h1 className="pt-10 font-bold text-4xl text-slate-500">
          Create Product
        </h1>
        <div className="flex flex-col gap-5">
          {imageUrl && (
            <div className="text-center">
              <img
                src={`${HOST}${imageUrl}`}
                alt={imageUrl}
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="">
            <label className="w-full text-center block px-4 py-11 mt-8 rounded-lg cursor-pointer border-white border-2">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                className={`${!image ? "hidden" : "text-white"}  `}
                onChange={UploadImg}
              />
            </label>
          </div>
          <div className="flex items-start justify-between gap-5 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name" className="text-xl">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="p-4 rounded-lg border  text-white bg-[#101011]"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="price" className="text-xl">
                Price
              </label>
              <input
                type="number"
                className="p-4 rounded-lg border text-white bg-[#101011]"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-start justify-between gap-5 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="quantity" className="text-xl">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                className="p-4 rounded-lg border  text-white bg-[#101011]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="brand" className="text-xl">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                className="p-4 rounded-lg border text-white bg-[#101011]"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full text-xl  flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="h-24 rounded-lg bg-[#101011] border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-start justify-between gap-5 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="countOfStock" className="text-xl">
                Count Of Stock
              </label>
              <input
                type="number"
                name="countInStock"
                className="p-4 rounded-lg border  text-white bg-[#101011]"
                value={countInStock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="category" className="text-xl">
                Category
              </label>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                className="p-4 rounded-lg border text-white bg-[#101011]"
              >
                <option className="" key="" value="">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option className="" key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            disabled={isLoading}
            onClick={AddingProduct}
            type="submit"
            className={`bg-pink-500 rounded-xl py-4 px-10 w-1/3 hover:bg-pink-700  focus:bg-pink-800 text-xl my-[1rem] `}
          >
            {isLoading ? "Loadign..." : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
