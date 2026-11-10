import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "An unexpected error occurred";
    let errors = [];

    if (error.response && error.response.data) {
      if (error.response.data.message) {
        message = error.response.data.message;
      }
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        errors = error.response.data.errors;
      }
    } else if (error.request) {
      message = "Unable to connect to server. Please ensure the backend is running.";
    }

    const customError = new Error(message);
    customError.errors = errors;
    customError.status = error.response ? error.response.status : null;
    return Promise.reject(customError);
  }
);

export default api;
