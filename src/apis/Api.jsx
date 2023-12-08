import axios from "axios";
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// creating test api
export const testApi = () => Api.get("/test");
// http://localhost:5000/test

//creating register Api
export const registerApi = (data) => Api.post("/api/user/create", data);
export const loginApi = (data) => Api.post("/api/user/login", data);
