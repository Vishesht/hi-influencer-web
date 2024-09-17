// lib/loginUser.js
import axiosInstance from "./axiosInstance";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Server responded with a status other than 2xx
      alert(error.response.data.message);
    } else if (error.request) {
      // No response received
      console.error("Network Error:", error.message);
    } else {
      // Other errors
      console.error("Error:", error.message);
    }
    throw error;
  }
};
