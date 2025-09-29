import axios from 'axios';
import { fulfilledRequest, fulfilledResponse, rejectResponse } from './utils';
import type { TRefreshClientFactoryOptions } from './types';

export const createRefreshClient = (options: TRefreshClientFactoryOptions) => {
    const { baseURL, getRefreshToken } = options;
    const client = axios.create({ baseURL });

    client.interceptors.request.use(fulfilledRequest(getRefreshToken));
    client.interceptors.response.use(fulfilledResponse, rejectResponse);

    return client;
};
