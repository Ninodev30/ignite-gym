import axios, { AxiosInstance } from 'axios';
import AppError from '@utils/AppError';
import storage from '@storage/index';

type SignOut = () => void;

type PromiseType = {
    resolve: (value: undefined) => void;
    reject: (reason: undefined) => void;
}

type APIIstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
    baseURL: 'http://10.1.1.109:3333'
}) as APIIstanceProps;

let isRefreshing: boolean = false;
let failedQueue: PromiseType[] = [];

api.registerInterceptTokenManager = signOut => {
    const interceptTokenManager = api.interceptors.response.use(response => response, async requestError => {
        try {
            if (requestError?.response?.status === 401) {
                if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
                    const token = await storage.token.get()

                    if (!token) {
                        signOut();
                        return Promise.reject(requestError);
                    }

                    const originalRequest = requestError.config;

                    if (isRefreshing)
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject })
                        })
                            .then((token) => {
                                originalRequest.headers.Authorization = `Bearer ${token}`
                                return axios(originalRequest);
                            })
                            .catch((error) => {
                                throw error;
                            })

                    isRefreshing = true;
                }

                signOut();
            }

            if (requestError.response && requestError.response.data)
                return Promise.reject(new AppError(requestError.response.data.message));

            return Promise.reject(requestError);
        }
        catch (error) {
            throw error;
        }
    }
    );

    return () => {
        api.interceptors.response.eject(interceptTokenManager)
    }
}

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