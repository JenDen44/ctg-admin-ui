import axios from 'axios';
import { fulfilledRequest, fulfilledResponse, rejectResponse } from './utils';
import type { AxiosError } from 'axios';
import type { TAuthClientFactoryOptions, TWaiter } from './types';

export const createAuthClient = (options: TAuthClientFactoryOptions) => {
    const { baseURL, getToken, refreshToken } = options;
    const client = axios.create({ baseURL });
    let isRefreshing = false;
    let waiters: TWaiter[] = [];
    const resolveWaiters = (token: string) => {
        waiters.forEach((waiter) => waiter.resolve(token));
        waiters = [];
    };
    const rejectWaiters = (error: unknown) => {
        waiters.forEach((waiter) => waiter.reject(error));
        waiters = [];
    };
    const authRejectResponse = async (error: AxiosError) => {
        const { config } = error;
        const apiError = await rejectResponse(error);

        if (!config || apiError.code !== 401) {
            return apiError;
        }

        config.retry = true;

        try {
            let token = '';

            if (isRefreshing) {
                token = await new Promise<string>((resolve, reject) => {
                    waiters.push({ resolve, reject });
                });
            } else {
                token = await refreshToken();
                isRefreshing = true;

                resolveWaiters(token);
            }

            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;

            return client(config);
        } catch (error: unknown) {
            rejectWaiters(error);

            throw error;
        } finally {
            isRefreshing = false;
        }
    };

    client.interceptors.request.use(fulfilledRequest(getToken));
    client.interceptors.response.use(fulfilledResponse, authRejectResponse);

    return client;
};
