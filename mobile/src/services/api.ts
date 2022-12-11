import axios, { AxiosInstance } from 'axios';
import AppError from '@utils/AppError';

const api: AxiosInstance = axios.create({
    baseURL: 'http://10.1.1.109:3333'
});

api.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response && error.response.data)
            return Promise.reject(new AppError(error.response.data.message));

        return Promise.reject(error);
    }
);

// api.interceptors.request.use(
//     (config) => {
//         console.log('AXIOS', config);
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;