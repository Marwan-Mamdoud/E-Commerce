"use client";
import ProductUpdate from "@/components/Admin/ProductUpdate";
import HeartIcon from "@/components/Shop/HeartIcon";
import ProductTabs from "@/components/Shop/ProductTabs";
import Ratings from "@/components/Shop/Ratings";
import { ApiClint } from "@/lib/api-client";
import {
  ADDREVIEW,
  ADDTOCART,
  GETPRODUCT,
  GETUSER,
  HOST,
  UPDATEPROFILE,
} from "@/lib/constant";
import { useAppStore } from "@/store";
import moment from "moment";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const [product, setProduct] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [qty, setQty] = useState();
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const {
    favoritesProd,
    setFavoriteProd,
    userInfo,
    setUserInfo,
    setCart,
    Cart,
  } = useAppStore();

  const submitHundler = async (e) => {
    e.preventDefault();
    try {
      console.log(userInfo._id);

      const data = await ApiClint.post(`${ADDREVIEW}/${product._id}`, {
        comment,
        rating,
      });
      if (data.data) {
        location.reload();
        toast.success(data.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiClint.post(`${ADDTOCART}/${product._id}`);
      if (res.data) {
        const user = await ApiClint.get(UPDATEPROFILE);
        localStorage.setItem("userInfo", JSON.stringify(user.data.user));
        localStorage.setItem("Cart", JSON.stringify(user.data.user.cart));
        setCart(user.data.user.cart);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data);
    }
  };

  console.log(Cart);
  const loadingProductReview = () => {};

  const getProduct = async () => {
    try {
      const data = await ApiClint(`${GETPRODUCT}/${params.prodId}`);
      if (data.data.product) {
        setProduct(data.data.product);
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
      }
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      toast.error(error.message || error?.response?.data);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) {
    return <div>Laoding...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-6  relative pt-[2rem] ml-[10rem]">
        <div className="">
          <img
            src={HOST + product.image}
            alt={product.name}
            className="w-full h-[25rem] rounded shadow-md  object-cover shadow-white mr-[2rem]"
          />
          <HeartIcon product={product} />
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold text-2xl">{product.name}</h2>
          <p className="my-4 text-[#BOBOBO]">{product.description}</p>
          <p className="my-4 text-5xl mb-8 font-extrabold">$ {product.price}</p>
          <div className="flex items-center  justify-between w-[20rem]">
            <div className="one">
              <h1 className="flex items-center mb-6">
                <FaStore className="text-white mr-4" /> Brand: {product.brand}
              </h1>
              <h1 className="flex items-center  mb-6">
                <FaClock className="text-white mr-4" /> Added:{" "}
                {moment(product.createdAt).fromNow()}
              </h1>
              <h1 className="flex items-center mb-6">
                <FaStar className="text-white mr-4" /> Reviews:{" "}
                {product.numReviews}
              </h1>
            </div>
            <div className="two">
              <h1 className="flex items-center mb-6">
                <FaStar className="text-white mr-4" /> Rating:{" "}
                {product.rating.toFixed(2)}
              </h1>
              <h1 className="flex items-center mb-6">
                <FaShoppingCart className="text-white mr-4" /> Quantity:{" "}
                {product.quantity}
              </h1>
              <h1 className="flex items-center mb-6">
                <FaBox className="text-white mr-4" /> In Stock:{" "}
                {product.countInStock}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap w-[25rem] items-center justify-between">
            <Ratings
              value={product.rating}
              text={`${product.numReviews} Reviews`}
            />
            {/* {product.countInStock > 0 && (
              <div className="">
                <select
                  value={qty}
                  onChang={(e) => setQty(e.target.value)}
                  className="text-white bg-black border-white border-2 p-2 w-24 rounded-lg"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )} */}
          </div>
          <div className=" mt-3">
            <button
              className="bg-pink-500 font-semibold px-6 py-3 rounded-lg hover:bg-pink-700"
              // disable={product.countInStock > 0}
              onClick={addToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between ml-[15rem] mt-[4rem]">
        <ProductTabs
          product={product}
          userInfo={userInfo}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          submitHundler={submitHundler}
          loadingProductReview={loadingProductReview}
        />
      </div>
      {}
    </>
  );
};

export default Page;
