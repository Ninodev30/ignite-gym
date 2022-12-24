import axios, { AxiosInstance } from 'axios';
import AppError from '@utils/AppError';
import storage from '@storage/index';

type PromiseType = {
    resolve: (value: undefined) => void;
    reject: (reason: undefined) => void;
}

type RegisterInterceptTokenManagerProps = {
    signOut: () => void;
    resfreshTokenUpdated: (newToken: string) => void;
}

type APIIstanceProps = AxiosInstance & {
    registerInterceptTokenManager: ({ }: RegisterInterceptTokenManagerProps) => () => void;
}

type ProcessQueueParams = ({
    error: Error | null;
    token: string | null;
});

const api = axios.create({
    baseURL: 'http://10.1.1.109:3333'
}) as APIIstanceProps;

let isRefreshing: boolean = false;
let failedQueue: PromiseType[] = [];

const processQueue = ({ error, token }: ProcessQueueParams): void => {
    failedQueue.forEach((request: any) => {
        if (error)
            request.reject(error);
        else
            request.resolve(token)
    });

    failedQueue = [];
};

api.registerInterceptTokenManager = ({ signOut, resfreshTokenUpdated }) => {
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
                                originalRequest.headers['Authorization'] = `Bearer ${token}`
                                return axios(originalRequest);
                            })
                            .catch((error) => {
                                throw error;
                            })

                    isRefreshing = true;

                    return new Promise(async (resolve, reject) => {
                        try {
                            const { data } = await api.post('/sessions/refresh-token', { token: token });
                            await storage.token.save(data.token);

                            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

                            resfreshTokenUpdated(data.token)
                            processQueue({ error: null, token: data.token });
                            resolve(originalRequest);
                        }
                        catch (error: any) {
                            processQueue({ error, token: null });
                            signOut();
                            reject(error);
                        }
                        finally {
                            isRefreshing = false;
                        }
                    })
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

export default api;