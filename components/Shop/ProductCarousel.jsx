import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { HOST } from "@/lib/constant";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
const ProductCarousel = ({ products }) => {
  const settings = {
    dots: false,
    slidesToShow: 1,
    Infinity: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <Slider {...settings} className="w-[35rem] h-[35rem] mt-8">
      {products.map((prod) => (
        <div className="" key={prod._id}>
          <img
            src={HOST + prod.image}
            alt={prod.name}
            className="w-full rounded-lg object-cover h-[30rem]"
          />
          <div className="flex  justify-between w-full">
            <div className="">
              <h2>{prod.name}</h2>
              <p>$ {prod.price}</p>
              <br />
              <p>{prod.description}</p>
            </div>
            <div className="flex justify-between gap-20">
              <div className="">
                <h1 className="flex items-center mb-6">
                  <FaStore className="mr-2 text-white" />
                  Brand: {prod.brand}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaClock className="mr-2 text-white" />
                  Time: {moment(prod.createdAt).fromNow()}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaStar className="mr-2 text-white" />
                  Reviews: {prod.numReviews}
                </h1>
              </div>
              <div className="">
                <h1 className="flex items-center mb-6">
                  <FaStar className="mr-2 text-white" />
                  Rating: {prod.rating.toFixed(2)}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaShoppingCart className="mr-2 text-white" />
                  Quantity: {prod.quantity}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaBox className="mr-2 text-white" />
                  In Stock: {prod.countInStock}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ProductCarousel;
