import { HOST } from "@/lib/constant";
import Link from "next/link";
import React from "react";
import HeartIcon from "./HeartIcon";

const CustomProducts = ({ products }) => {
  return (
    <div className=" w-full grid grid-cols-3  gap-10 mt-20 mb-10">
      {products.map((prod) => (
        <div key={prod._id} className="w-[20rem]  mb-20 mx-auto relative">
          <div className="mb-1 relative">
            <img
              src={HOST + prod.image}
              alt={prod.name}
              className=" h-[20rem] mx-auto object-cover rounded"
            />
            <HeartIcon product={prod} />
          </div>
          <div className="p-4">
            <Link key={prod._id} href={`/shop/${prod._id}`}>
              <h2 className="flex justify-between items-center tex-xl">
                <div className="font-semibold">{prod.name}</div>
                <div className="font-bold px-8 py-1 bg-pink-300 text-pink-600 text-sm rounded-full ">
                  $ {prod.price}
                </div>
              </h2>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomProducts;
