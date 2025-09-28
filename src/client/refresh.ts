import { auth, tokensSchema } from 'features';
import { refreshClient } from './refreshClient';
import type { TTokens } from 'features';

export const refresh = async () => {
    const response = await refreshClient.post<TTokens>('/refresh', undefined, { schema: tokensSchema });

    auth.saveTokens(response.data);

    return response.data.token;
};
