import { HOST } from "@/lib/constant";
import Link from "next/link";
import React from "react";
import HeartIcon from "./HeartIcon";

const SmallProducts = ({ product }) => {
  return (
    <div className="w-80  p-3 ml-16 mt-16">
      <div className="relative">
        <img
          src={HOST + product.image}
          alt={product.name}
          className="h-52 mx-auto object-cover rounded-lg"
        />
        <HeartIcon product={product} />
      </div>
      <div className="w-full mt-4 ">
        <Link href={`/shop/${product._id}`}>
          <div className="flex justify-between gap-4 items-center">
            <p className="font-bold">{product.name}</p>
            <span className="px-8 py-1 bg-pink-300 text-pink-600 text-sm rounded-full font-medium">
              $ {product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProducts;
