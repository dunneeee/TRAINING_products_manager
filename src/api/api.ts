import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

console.log(import.meta.env.ENVIRONMENT);

// change baseURL to localhost:3000 for local development
const axiosParams = {
  baseURL: 'http://54.179.202.186:3000/',
};

const axiosInstance: AxiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get<T>(url: string, config?: AxiosRequestConfig) {
      return axios.get<T>(url, config);
    },
    delete<T>(url: string, config?: AxiosRequestConfig) {
      return axios.delete<T>(url, config);
    },
    post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
      return axios.post<T>(url, data, config);
    },
    put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
      return axios.put<T>(url, data, config);
    },
    patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
      return axios.patch<T>(url, data, config);
    },
  };
};

export default api(axiosInstance);
