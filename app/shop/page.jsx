"use client";
import ProductCart from "@/components/Shop/ProductCart";
import { ApiClint } from "@/lib/api-client";
import {
  GETALLCATEGORIES,
  GETALLPRODUCT,
  GETFILTERPRODUCTS,
} from "@/lib/constant";
import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const { setCategories, categories, setProducts, products } = useAppStore();
  const [minPriceFilter, setMinPriceFilter] = useState();
  const [maxPriceFilter, setMaxPricrFilter] = useState();
  const [testCategory, setTestCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState();
  const [brandFilter, setBrandFilter] = useState();

  const getProducts = async () => {
    const res = await ApiClint(GETALLPRODUCT);
    if (res.data.products) {
      setProducts(res.data.products);
    }
  };

  const getcategories = async () => {
    try {
      const res = await ApiClint(GETALLCATEGORIES);
      if (res.data.categories) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
  };

  const getFilterProduct = async () => {
    try {
      const res = await ApiClint.post(GETFILTERPRODUCTS, {
        category: categoryFilter,
        maxPrice: maxPriceFilter,
        minPrice: minPriceFilter,
        brand: brandFilter,
      });
      if (res.data) {
        setProducts(res.data.products);
        const brandss = res.data.products.map((prod) => prod.brand);
        setBrands([...new Set(brandss)]);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  useEffect(() => {
    getcategories();
  });

  useEffect(() => {
    getFilterProduct();
  }, [categoryFilter, maxPriceFilter, minPriceFilter, brandFilter]);

  return (
    <div className="flex gap-14 w-full">
      <div className="flex fixed  flex-col w-72 ml-20 rounded bg-[#151515] h-[100vh] scrollbar-hide overflow-scroll">
        {/* <select
              name="categories"
              id="categories"
              value={categoryFilter}
              className="bg-black border w-52 mx-auto h-12 text-white font-semibold  rounded-lg  mt-3 mb-2 "
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option
                value=""
                className="text-center rounded text-white font-semiboldbg-black mb-2 "
              >
                Filter By Category
              </option>
              <option value="" className=" text-center">
                All
              </option>
              {categories?.map((cat) => (
                <option
                  className="bg-black  text-center font-semibold"
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              ))}
            </select> */}

        <div className="flex flex-col gap-5 w-full items-center justify-start pb-10 ">
          <h2 className="text-2xl font-mono border p-2 mt-5 rounded">
            Filter By Category
          </h2>
          <div className="flex items-center justify-center ml-2">
            <input
              type="radio"
              id=""
              value=""
              name="category"
              onChange={(e) => {
                setCategoryFilter("");
                setBrandFilter("");
              }}
            />
            <label htmlFor="">All</label>
          </div>
          {categories?.map((cat) => (
            <div key={cat} className="flex items-center justify-center ml-2">
              <input
                type="radio"
                id={cat}
                value={cat}
                name="category"
                className="mr-1 "
                onChange={(e) => {
                  setBrandFilter("");
                  setCategoryFilter(cat._id);
                  // toast.success(`${process.env.PAYPAL_CLIENT_ID}`);
                }}
              />
              <label htmlFor={cat}>{cat.name}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full -5 items-center justify-start pb-10">
          <h2 className="text-2xl font-mono border rounded mb-4 p-2">
            Filter By Brand
          </h2>
          <div className="flex items-center mb-2 justify-center ">
            <input
              type="radio"
              id=""
              value=""
              name="brand"
              className="mr-1"
              onChange={(e) => {
                setBrandFilter("");
              }}
            />
            <label htmlFor="">All</label>
          </div>
          {brands?.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center mb-3 ml-2"
            >
              <input
                type="radio"
                name="brand"
                id={brand}
                value={brand}
                className="ring-pink-500 border-gray-400 mr-1"
                onChange={(e) => {
                  setBrandFilter(e.target.value);
                }}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
          -----------------------------------
          <button
            className="w-1/2 mt-2 bg-pink-600  rounded-lg text-xl  font-mono font-semibold"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
      </div>
      {/* <div className="flex gap-20 items-center justify-center"> */}{" "}
      <div className=" mt-8 ml-[24rem]  w-full">
        <h2 className="text-3xl mb-12 font-mono font-semibold">Products</h2>
        <div className=" ml-12 mr-12 grid grid-cols-3 gap-10">
          {loading ? (
            "Loading..."
          ) : (
            <>
              {products.map((prod) => (
                <ProductCart key={prod.name} product={prod} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
