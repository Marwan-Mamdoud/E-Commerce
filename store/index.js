import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createFavoriteSlice } from "./slices/favoriteSlice";
import { CreateCartSlice } from "./slices/cartSlice";
import { createShopSlice } from "./slices/shop";

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  ...createFavoriteSlice(...a),
  ...CreateCartSlice(...a),
  ...createShopSlice(...a),
}));
