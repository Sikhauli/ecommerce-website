import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-website-api-18s2.onrender.com/api/";

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const AUTH_ENDPOINTS = {
    login: "auth/login",
    register: "auth/register",
    logout: "auth/logout",
    authenticate: "auth/authenticate"
};

export const PRODUCT_ENDPOINTS = {
    get: "product/",
    update: "/product/",
    delete: "/product/",
    add: "/product/add",
};

export const CART_ENDPOINTS = {
    get: "cart/",
    update: "/cart/",
    delete: "/cart/",
    add: "/cart/add",
};

export const USER_PERMISSIONS = [
    "FULL-ACCESS",
    "READ-ONLY",
];

export const USER_TYPES = [
    "CUSTOMER",
    "ADMIN",
];

export const USER_STATUS = [
    "ACTIVE",
    "BLOCKED",
];

export const getAxiosError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        return error.response.data;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return error.request.data;
    } else {
        console.error(error);
        return "Internal error occured!";
        // return error.message;
    }
};
