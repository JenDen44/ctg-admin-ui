import { authClient, publicClient } from 'client';
import { auth, tokensSchema } from 'features';
import type { TLogin, TTokens } from 'features';

export const login = async (data: TLogin) => {
    const response = await publicClient.post<TTokens>('/login', data, { schema: tokensSchema });

    auth.saveTokens(response.data);
};

export const logout = async () => {
    await authClient.post('/logout');

    auth.clear();
};
