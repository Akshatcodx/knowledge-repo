import axios from "axios";
// get staff
export const getAllStaff = () => axios.get("http://localhost:8000/staff");
// get particular staff
export const getStaffById = (id) =>
  axios.get(`http://localhost:8000/staff/${id}`);
//   delete staff

export const deleteStaffById = (id) =>
  axios.delete(`http://localhost:8000/staff/${id}`);
//   Add staff
export const addStaff = (payload) =>
  axios.post(`http://localhost:8000/staff/`, payload);
//   edit staff
export const editStaff = (id, payload) =>
  axios.put(`http://localhost:8000/staff/${id}`, payload);

// crud  api

// create a user (post api)
export const createUser = (payload) =>
  axios.post(`https://jsonplaceholder.typicode.com/users`, payload);

// read all users

export const getUsers = () =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);

// get user by id /Get single user/get particular user

export const getUserById = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

// update user

export const updateUser = (payload, id) =>
  axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, payload);

// delete user
export const deleteUser = (id) =>
  axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
