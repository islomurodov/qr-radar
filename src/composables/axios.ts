import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  config => ({ ...config }),
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => Promise.reject(error),
)

export default instance
