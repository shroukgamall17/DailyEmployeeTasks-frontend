import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  //baseURL: "http://localhost:3001/",
  baseURL: "https://daily-employee-tasks-backend.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});


export default axiosInstance;

