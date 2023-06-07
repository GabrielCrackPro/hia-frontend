import axios from "axios";

const api = axios.create({
  // baseURL: "http://127.0.0.1:3001/api/v1/",
  baseURL: "https://hia-api.onrender.com/api/v1",

  headers: {
    // "Access-Control-Allow-Origin": "https://127.0.0.1:3001/",
    "Access-Control-Allow-Origin": "https://hia-api.onrender.com",
    "Content-Type": "application/json",
  },
});

const getData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

const postData = async (endpoint, data) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

const putData = async (endpoint, data) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

const deleteOne = async (type, id) => {
  await api.delete(`${type}/${id}`);
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export { api, getData, postData, putData, deleteOne, capitalize };
