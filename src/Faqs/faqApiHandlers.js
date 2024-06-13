import axios from "axios";
const URL = "http://localhost:8000/faqs";
export const getFaqs = () => axios.get(`${URL}`);
export const addFaq = (payload) => axios.post(`${URL}`, payload);
export const deleteFaq = (id) => axios.delete(`${URL}/${id}`);
export const updateFaq = (payload, id) => axios.put(`${URL}/${id}`, payload);
