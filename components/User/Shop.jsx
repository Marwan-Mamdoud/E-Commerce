import { useAppStore } from "@/store";
import React from "react";
const Shop = () => {
  const { userInfo } = useAppStore.getState();
  // console.log(userInfo);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div>
      <p>Shop: {user.username}</p>
    </div>
  );
};

export default Shop;
