"use client";
import { ApiClint } from "@/lib/api-client";
import {
  GETALLCATEGORIES,
  GETPRODUCT,
  UPDATEPRODUCT,
  UPLOADIMAGE,
} from "@/lib/constant";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductUpdate = ({ id }) => {
  const [product, setProduct] = useState();
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [categories, setCategories] = useState([]);
  const [countInStock, setStock] = useState(product?.countInStock || 0);
  const [image, setImage] = useState(product?.image || "");
  const [imageUrl, setImageUrl] = useState(product?.image || null);
  const [isLoading, setIsLoading] = useState(false);

  const getprod = async () => {
    try {
      const res = await ApiClint(`${GETPRODUCT}/${id}`);
      if (res.data.product) {
        console.log(res.data, "product");

        setProduct(res.data.product);
      }
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setQuantity(product.quantity);
      setBrand(product.brand);
      setCategory(product.categoy);
      setStock(product.countInStock);
      setImage(product.image);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
    }
  };

  const getCategory = async () => {
    const data = await ApiClint(GETALLCATEGORIES);
    if (data.data.categories) setCategories(data.data.categories);
  };

  useEffect(() => {
    getCategory();
    getprod();
  }, [product]);

  const UploadImg = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    console.log(e.target.files);

    formdata.append("image", e.target.files[0] || product.image);
    try {
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

  const updateProduct = async () => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", imageUrl);
      formData.append("countInStock", countInStock);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("quantity", quantity);
      const res = await ApiClint.put(
        `${UPDATEPRODUCT}/${product._id}`,
        formData
      );
      console.log(res, "Data For Product.");
      if (res.data.product) {
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
    <div className=" xl:mx-[9rem] sm:mx-[0]">
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
              value={name}
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
          onClick={updateProduct}
          type="submit"
          className={`bg-pink-500 rounded-xl py-4 px-10 w-1/3 hover:bg-pink-700  focus:bg-pink-800 text-xl my-[1rem] `}
        >
          {isLoading ? "Updateing..." : `Update  Product`}
        </button>
      </div>
    </div>
  );
};

export default ProductUpdate;
