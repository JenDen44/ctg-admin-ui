import { createPublicClient } from './publicClientFactory';

export const publicClient = createPublicClient({ baseURL: '/api' });
