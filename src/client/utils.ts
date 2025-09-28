import { toApiError, zodErrorToApiError } from 'features';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const fulfilledResponse = (response: AxiosResponse) => {
    const schema = response.config.schema;

    if (schema) {
        const parsed = schema.safeParse(response.data);

        if (!parsed.success) {
            throw zodErrorToApiError(parsed.error);
        }

        response.data = parsed.data;
    }

    return response;
};

export const rejectResponse = async (error: AxiosError) => {
    const apiError = toApiError(error);

    return apiError;
};

export const fulfilledRequest = (getToken: () => Promise<string>) => async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};
