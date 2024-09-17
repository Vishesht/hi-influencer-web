// lib/axiosInstance.js
import axios from "axios";
import { BaseUrl } from "../common/utils";

const axiosInstance = axios.create({
  baseURL: `${BaseUrl}/api`, // Adjust this to your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
