import axios from 'axios';

// Dynamic Base URL
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:6001";
// console.log("API Base URL:", apiUrl);

const axiosPublic = axios.create({
    baseURL: apiUrl,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;


