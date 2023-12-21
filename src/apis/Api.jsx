import axios from "axios";
const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// creating test api
export const testApi = () => Api.get("/test");
// http://localhost:5000/test

//creating register Api
export const registerApi = (data) => Api.post("/api/user/create", data);
export const loginApi = (data) => Api.post("/api/user/login", data);

//create product app
export const createproductApi = (formData) =>
  Api.post("/api/product/create_product", formData);

//get products Api
export const getAllProductsApi = () => Api.get("/api/product/get_products");
//edit product
// export const editProductsApi=()=> Api.get('/api/product/edit_products')

// get single product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_product/${id}`);

// update product
export const updateProductApi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData);
