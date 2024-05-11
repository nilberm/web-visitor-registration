import axios from "axios";
const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const api = axios.create({
  baseURL: "https://api-visitor-registration.vercel.app/",
  adapter: axios.defaults.adapter,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/",
});
