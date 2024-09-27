"use client";
import CustomProducts from "@/components/Shop/CustomProducts";
import { useAppStore } from "@/store";
import React from "react";

const Page = () => {
  const { favoritesProd, setFavoriteProds } = useAppStore();
  return (
    <div className="w-full h-full">
      <div className="ml-40 pt-10">
        <h2 className="font-mono text-3xl mb-20">Favorite Products</h2>
        {favoritesProd.length > 0 ? (
          <CustomProducts products={favoritesProd} />
        ) : (
          <h2> No Favorite Products </h2>
        )}
      </div>
    </div>
  );
};

export default Page;
