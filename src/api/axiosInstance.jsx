import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://portfolio-backend-eight-sepia.vercel.app",
  timeout: 2000
});

export default axiosInstance;