export const getFavoratesFromLocalStorage = () => {
  const favorate = localStorage.getItem("favorites");
  return favorate ? JSON.parse(favorate) : [];
};

export const addProductToFavoriteLocalStorage = (product) => {
  const favorites = getFavoratesFromLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeProductFromFavoriteLocalStorage = (productId) => {
  const favorates = getFavoratesFromLocalStorage();
  const updatedFavorite = favorates.filter((p) => p._id !== productId);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorite));
};
