import { ApiClint } from "./api-client";

export const HOST = "https://e-commerce-backend-lyart.vercel.app";
//============================================================================
//============================================================================
export const API_USER = "/api/user";
export const LOGGOUT = `${API_USER}/loggout`;
export const LOGGIN = `${API_USER}/loggin`;
export const REGISTER = `${API_USER}/create-user`;
export const UPDATEPROFILE = `${API_USER}/profile`;
export const GETALLUSERS = `${API_USER}/get-all-users`;
export const GETUSER = `${API_USER}/get-user`;
export const UPDATEUSER = `${API_USER}/update-user`;
export const DELETEUSER = `${API_USER}/delete-user`;
export const ADDTOCART = `${API_USER}/add-tocart`;
export const RemoveFromCart = `${API_USER}/remove-fromCart`;
export const ADDSHIPPINGADDRESS = `${API_USER}/add-shippingAddress`;
export const ClearCart = `${API_USER}/clear-cart`;

//============================================================================
//============================================================================

export const API_CATEGORY = "/api/category";
export const GETALLCATEGORIES = `${API_CATEGORY}/getAll-categories`;
export const DELETECATEGORY = `${API_CATEGORY}/delete-category`;
export const CREATECATEGORY = `${API_CATEGORY}/create-category`;
export const UPDATECATEGORY = `${API_CATEGORY}/update-category`;

//============================================================================
//============================================================================

export const API_PRODUCT = "/api/product";
export const API_UPLOAD = "/api/uploads";
export const GETALLPRODUCT = `${API_PRODUCT}/getAll-products`;
export const UPLOADIMAGE = `${API_UPLOAD}/upload-image`;
export const CREATEPRODUCT = `${API_PRODUCT}/create-product`;
export const GETPRODUCT = `${API_PRODUCT}/get-product`;
export const UPDATEPRODUCT = `${API_PRODUCT}/update-product`;
export const DELETEPRODUCT = `${API_PRODUCT}/delete-product`;
export const GETBESTPRODUCTS = `${API_PRODUCT}/getBest-products`;
export const GETCUSTOMPRODUCTS = `${API_PRODUCT}/getCustom-products`;
export const GETFILTERPRODUCTS = `${API_PRODUCT}/filter-products`;

//============================================================================
//============================================================================

export const API_ORDER = "/api/order";
export const CREATEORDER = `${API_ORDER}/create-order`;
export const MARKORDERASPAID = `${API_ORDER}/markOrderAsPaid`;
export const GETMYORDER = `${API_ORDER}/getMy-orders`;
export const MARKORDERASDELIVERED = `${API_ORDER}/markOrderAdDeliverd`;
export const GETMyORDER = `${API_ORDER}/get-order`;
export const GETALLORDERS = `${API_ORDER}/getAll-orders`;

//============================================================================

export const ADDREVIEW = `${API_PRODUCT}/add-review`;
