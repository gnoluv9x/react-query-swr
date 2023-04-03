import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8008/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getListUsers = () => {
  return axiosClient.get("/getAll").then(resp => resp.data);
};

export const postUsers = body => {
  return axiosClient.post("/post", body);
};

export const deleteUser = id => {
  return axiosClient.delete(`/delete/${id}`);
};
