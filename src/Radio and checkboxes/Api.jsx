import axios from "axios";
export const getInfo = () => axios.get("http://localhost:8000/info");
export const updateInfo = (id, payload) =>
  axios.put(`http://localhost:8000/info/${id}`, payload);
export const postInfo = (payload) =>
  axios.post("http://localhost:8000/info", payload);
