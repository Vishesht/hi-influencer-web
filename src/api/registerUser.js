// lib/registerUser.js (or in a component)
import axiosInstance from "./axiosInstance";

export const registerUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/register", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.log("Server Error:", error.response.data.message);
      alert(error.response.data.message);
    } else if (error.request) {
      // No response received
      console.log("Network Error:", error.message);
    } else {
      // Other errors
      console.log("Error:", error.message);
    }
  }
};
