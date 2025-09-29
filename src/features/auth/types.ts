import type z from 'zod';
import type { tokensSchema } from './schemas';

export type TLogin = {
    login: string;
    password: string;
};

export type TTokens = z.infer<typeof tokensSchema>;

export type TAuthSubscriber = (tokens: NullOr<TTokens>) => void;
