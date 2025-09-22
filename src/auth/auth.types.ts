export type TTokens = {
    accessToken: string;
    refreshToken: string;
};

export type TTokensSubscriber = (tokens: NullOr<TTokens>) => void;
