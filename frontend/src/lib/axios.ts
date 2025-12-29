import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api"
      : import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        await generateRefreshToken();
        console.log("Success");
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const generateRefreshToken = async () => {
  try {
    await axiosInstance.get("/auth/refresh-token");
  } catch (error: any) {
    console.error(error);
    toast.error(error?.response?.data?.error?.message);
  }
};
