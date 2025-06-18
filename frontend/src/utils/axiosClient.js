// ✅ axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', // adjust if needed
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  },
});

// Optional: Intercept 401/403 to auto-logout
axiosClient.interceptors.response.use(
  res => res,
  err => {
    if (
      err.response?.status === 401 ||
      err.response?.status === 403 ||
      err.response?.data?.msg === 'Invalid token'
    ) {
      localStorage.clear();
      alert("Your session has expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
