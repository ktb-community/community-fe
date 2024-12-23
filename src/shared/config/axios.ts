import axios from 'axios';
import { ENV } from '@/shared/config/env';

const axiosInstance = axios.create({
  baseURL: ENV.API_URL,
  timeout: 5000,
});

export default axiosInstance;