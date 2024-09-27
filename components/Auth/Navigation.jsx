"use client";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./Navigation.css";
import Link from "next/link";
import { useAppStore } from "@/store";
import { ApiClint } from "@/lib/api-client";
import { LOGGOUT } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getFavoratesFromLocalStorage } from "@/lib/FavoriteStorage";
const Navigation = () => {
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [hover, sethover] = useState(false);
  const {
    userInfo,
    setUserInfo,
    setFavoriteProd,
    favoritesProd,
    setCart,
    Cart,
  } = useAppStore();
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    setCart(JSON.parse(localStorage.getItem("Cart")));
    setFavoriteProd(getFavoratesFromLocalStorage());
  }, []);
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };
  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const loggoutHundler = async () => {
    try {
      const res = await ApiClint.post(LOGGOUT);
      if (res) {
        setUserInfo(null);
        setCart(null);
        localStorage.clear();
        router.push("/loggin");
        toast.success("Done loggout successfully.");
      }
    } catch (error) {
      console.error(`Error Loggout API Hundler: ${error.message}`);
      toast.error(`${error.response.data || error?.data?.message}`);
    }
  };
  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex  "
      } sm:hidden md:hidden xl:flex lg:flex flex-col justify-between  p-4 text-white bg-slate-800/50 w-[5%]  h-[100vh] hover:w-[20%] fixed`}
      id="navigation-container"
      onClick={() => (dropDown ? setDropDown(!dropDown) : false)}
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          href="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
          {""}
        </Link>
        <Link
          href="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          {""}
        </Link>
        <Link
          href="/shop/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>
          {""}
          {Cart?.items?.length > 0 && (
            <span className="absolute top-9 left-3 text-sm px-1.5 text-center text-white bg-pink-500 rounded-full">
              {Cart.items.reduce((item, acc) => acc.quantity + item, 0)}
            </span>
          )}
        </Link>
        <Link
          href="/shop/favorite"
          className="flex relative items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={26} className="mr-2 mt-[3rem]" />
          <span className="hidden nav-item-name mt-[3rem]">FAVORATE</span>
          {favoritesProd.length > 0 && (
            <span className="absolute top-9 left-3 text-sm px-1.5 text-center text-white bg-pink-500 rounded-full">
              {favoritesProd.length}
            </span>
          )}
          {""}
        </Link>
      </div>
      <div className="realtive">
        {userInfo && dropDown && (
          <ul
            className={`right-8  ml-16 space-y-2 w-fit font-semibold  border-2 border-white text-gray-500 ${
              !userInfo.isAdmin ? "-top-24" : "-top-96"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  {" "}
                  <Link
                    href="/dashboard"
                    className="px-4 py-1 block hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link
                    href="/admin/products"
                    className="px-4 py-1 block hover:bg-gray-100"
                  >
                    Products
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link
                    href="/admin/categories"
                    className="px-4 py-1 block hover:bg-gray-100"
                  >
                    Categories
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link
                    href="/admin/orders"
                    className="px-4 py-1 block hover:bg-gray-100"
                  >
                    Orders
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link
                    href="/admin/users"
                    className="px-4 py-1 block hover:bg-gray-100"
                  >
                    Users
                  </Link>{" "}
                </li>
              </>
            )}
            <li>
              {" "}
              <Link
                href="/profile"
                className="px-4 py-1 block hover:bg-gray-100"
              >
                profile
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link
                href="/orders"
                className="px-4 pt-1 block hover:bg-gray-100"
              >
                My Orders
              </Link>{" "}
            </li>
            <li>
              {" "}
              <button
                onClick={loggoutHundler}
                className="px-4 py-1 w-full block hover:bg-red-400"
              >
                Loggout
              </button>{" "}
            </li>
          </ul>
        )}
        <button
          className="flex text-gray-800 items-center focus:outline-none"
          onClick={toggleDropDown}
        >
          {userInfo ? (
            <span className={`text-white hover: uppercase font-semibold`}>
              {userInfo.username}
            </span>
          ) : (
            <></>
          )}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${
                dropDown ? "transform rotate-180" : " "
              } h-4 w-4 ml-1 duration-200`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="rounded"
                strokeWidth="2"
                d={"M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>
      </div>
      {!userInfo && (
        <>
          <ul>
            <li>
              <Link
                href="/loggin"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin size={26} className="mr-2 mt-[3rem]" />
                <span className="hidden nav-item-name mt-[3rem]">LOGGIN</span>
                {""}
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} className="mr-2 mt-[3rem]" />
                <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
                {""}
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Navigation;
