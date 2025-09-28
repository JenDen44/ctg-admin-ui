import { publicClient, refreshClient } from 'client';
import { auth, tokensSchema } from 'features';
import type { TLogin, TTokens } from 'features';

export const login = async (data: TLogin) => {
    const response = await publicClient.post<TTokens>('/login', data, { schema: tokensSchema });

    auth.saveTokens(response.data);
};

export const refresh = async () => {
    const response = await refreshClient.post<TTokens>('/refresh', undefined, { schema: tokensSchema });

    auth.saveTokens(response.data);

    return response.data.token;
};

export const logout = async () => {
    await publicClient.post('/logout');

    auth.clear();
};
