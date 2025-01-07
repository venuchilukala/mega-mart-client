import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:6001";


const axiosSecure = axios.create({
  baseURL: apiUrl,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("jwt-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/signup");
      }
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
