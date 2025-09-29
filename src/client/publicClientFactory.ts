import axios from 'axios';
import { fulfilledResponse, rejectResponse } from './utils';
import type { TPublicClientFactoryOptions } from './types';

export const createPublicClient = (options: TPublicClientFactoryOptions) => {
    const { baseURL } = options;
    const client = axios.create({ baseURL });

    client.interceptors.response.use(fulfilledResponse, rejectResponse);

    return client;
};
