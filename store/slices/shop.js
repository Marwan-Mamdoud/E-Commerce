export const createShopSlice = (set) => ({
  products: null,
  setProducts: (products) => set({ products }),
  categories: undefined,
  setCategories: (categories) => set({ categories }),
});
