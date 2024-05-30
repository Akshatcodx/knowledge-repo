import axios from "axios";
export const getAllproducts = (query = "") =>
  axios.get(`https://dummyjson.com/products/?${query}`);
