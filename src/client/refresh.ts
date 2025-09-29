import { auth, tokensSchema } from 'features';
import { refreshClient } from './refreshClient';
import type { TTokens } from 'features';

const REFRESH_URL = '/refresh';

export const refresh = async () => {
    const response = await refreshClient.post<TTokens>(REFRESH_URL, undefined, { schema: tokensSchema });

    auth.saveTokens(response.data);

    return response.data.token;
};
