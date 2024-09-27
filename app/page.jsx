"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ApiClint } from "@/lib/api-client";
import { GETBESTPRODUCTS, GETCUSTOMPRODUCTS } from "@/lib/constant";
import SmallProducts from "@/components/Shop/SmallProducts";
import ProductCarousel from "@/components/Shop/ProductCarousel";
import Link from "next/link";
import CustomProducts from "@/components/Shop/CustomProducts";
import { getBestProducts, getCustomProduts } from "@/lib/Mission";
const Page = () => {
  const router = useRouter();
  const [bestProducts, setBestProducts] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);

  const getBestProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (!user) {
        router.push("/loggin");
        throw new Error("You are not loggin");
      }
      const data = await ApiClint(GETBESTPRODUCTS);
      if (data.data.products) {
        toast.success(data.data.Message);
        setBestProducts(data.data.products);
        console.log(data.data.products, "best products");
      }
    } catch (error) {
      toast.error(
        `${error.message || error.response.data || error?.data?.message}`
      );
    }
  };

  const getCustomProduts = async () => {
    try {
      const data = await ApiClint(GETCUSTOMPRODUCTS);
      if (data.data) {
        setCustomProducts(data.data.products);
        toast.success(data.data.Message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    getBestProducts();
    getCustomProduts();
  }, []);

  return (
    <>
      <div className="mx-auto flex justify-around">
        <div className="xl:block md:hidden lg:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {bestProducts?.map((product) => (
              <div className="" key={product._id}>
                <SmallProducts product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel products={bestProducts} />
      </div>
      <div className="mx-auto flex  justify-around gap-5 mt-[10rem] items-center">
        <h2 className="text-[3rem]">Special Products</h2>
        <Link
          href="/shop"
          className="bg-pink-600 text-white px-14 py-3 text-[1rem]  rounded-full font-blod"
        >
          Shop
        </Link>
      </div>
      <CustomProducts products={customProducts} />
    </>
  );
};

export default Page;
