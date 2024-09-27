"use client";
import {
  addProductToFavoriteLocalStorage,
  getFavoratesFromLocalStorage,
  removeProductFromFavoriteLocalStorage,
} from "@/lib/FavoriteStorage";
import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HeartIcon = ({ product }) => {
  const { favoritesProd, setFavoriteProd } = useAppStore();
  const isFavorites = favoritesProd.some((p) => p._id === product._id);
  const toggleFavorite = (e) => {
    if (isFavorites) {
      removeProductFromFavoriteLocalStorage(product._id);
      setFavoriteProd(getFavoratesFromLocalStorage());
      // location.reload();
    } else {
      addProductToFavoriteLocalStorage(product);
      setFavoriteProd(getFavoratesFromLocalStorage());
      // location.reload();
    }
  };
  useEffect(() => {
    setFavoriteProd(getFavoratesFromLocalStorage());
  }, []);
  return (
    <div
      onClick={toggleFavorite}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorites ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-gray-500" />
      )}
    </div>
  );
};

export default HeartIcon;
