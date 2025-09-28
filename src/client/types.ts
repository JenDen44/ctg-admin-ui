export type TPublicClientFactoryOptions = {
    baseURL?: string;
};

export type TAuthClientFactoryOptions = {
    baseURL?: string;
    getToken: () => Promise<string>;
    refreshToken: () => Promise<string>;
};

export type TWaiter = {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
};

export type TRefreshClientFactoryOptions = {
    baseURL?: string;
    getRefreshToken: () => Promise<string>;
};
