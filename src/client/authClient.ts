import { auth } from 'features';
import { refresh } from 'api';
import { createAuthClient } from './authClientFactory';

export const authClient = createAuthClient({ baseURL: '/api', getToken: auth.getToken, refreshToken: refresh });
