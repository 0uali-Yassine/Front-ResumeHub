import axios from 'axios';
import { BASE_URL } from './constants';

const axiosInstance = axios.create ({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        //console.log('Request Headers:', config.headers);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;