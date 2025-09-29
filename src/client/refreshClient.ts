import { auth } from 'features';
import { createRefreshClient } from './refreshClientFactory';

export const refreshClient = createRefreshClient({ baseURL: '/api', getRefreshToken: auth.getRefreshToken });
