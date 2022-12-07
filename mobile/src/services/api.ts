import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://10.1.1.109:3333'
});

export default api;