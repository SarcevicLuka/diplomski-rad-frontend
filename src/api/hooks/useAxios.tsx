import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AvailableRoutes } from "../../routes/AvailableRoutes";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";

export function useAxios() {
  const navigation = useNavigate();
  const { saveToken, token } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosInstance.interceptors.request.use((request) => {
    console.log(token);
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(response);
      if (response.data.token) {
        if (saveToken) saveToken(response.data);
        navigation(AvailableRoutes.Home);
      }
      return response;
    },
    (error) => {
      const statusCode = error.response?.status;

      switch (statusCode) {
        case 401:
          navigation(AvailableRoutes.Login);
          break;

        case 403:
          navigation(AvailableRoutes.Login);
          break;
      }
      return Promise.reject(error);
    }
  );

  return { axiosInstance };
}
