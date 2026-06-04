import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://portfolio-backend-eight-sepia.vercel.app",
});

export default axiosInstance;