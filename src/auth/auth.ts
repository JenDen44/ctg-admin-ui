import type { TTokens, TTokensSubscriber } from './auth.types';

class Auth {
    private readonly storageKey = 'app.auth.tokens';
    private storage: Storage;
    private broadcastChannel?: BroadcastChannel;
    private subscribers: Set<TTokensSubscriber> = new Set();
    private tokens: NullOr<TTokens> = null;

    constructor() {
        this.storage = window.localStorage;
        this.broadcastChannel = 'BroadcastChannel' in window ? new BroadcastChannel('auth-tokens') : undefined;

        this.broadcastChannel?.addEventListener('message', (e) => {
            if (e?.data?.type === 'TOKENS_SET') {
                this.tokens = e.data.payload;
                this.notify();
            } else if (e?.data?.type === 'TOKENS_CLEAR') {
                this.tokens = null;
                this.notify();
            }
        });

        this.hydrateFromStorage();
    }

    getToken = async () => {
        if (this.tokens?.accessToken) {
            return this.tokens.accessToken;
        }

        this.hydrateFromStorage();

        return this.tokens?.accessToken || '';
    };

    getRefreshToken = async () => {
        if (this.tokens?.refreshToken) {
            return this.tokens.refreshToken;
        }

        this.hydrateFromStorage();

        return this.tokens?.refreshToken || '';
    };

    saveTokens = (tokens: TTokens) => {
        this.tokens = tokens;

        this.persist(this.tokens);
        this.notify();
        this.broadcastChannel?.postMessage({ type: 'TOKENS_SET', payload: this.tokens });
    };

    clear = () => {
        this.tokens = null;

        this.removePersisted();
        this.notify();
        this.broadcastChannel?.postMessage({ type: 'TOKENS_CLEAR' });
    };

    subscribe = (fn: TTokensSubscriber) => {
        this.subscribers.add(fn);
        fn(this.tokens);

        return () => this.subscribers.delete(fn);
    };

    private notify = () => {
        for (const fn of this.subscribers) {
            fn(this.tokens);
        }
    };

    private hydrateFromStorage = () => {
        const storageValue = this.storage.getItem(this.storageKey);

        if (!storageValue) {
            return;
        }

        try {
            this.tokens = JSON.parse(storageValue) ?? null;
        } catch {
            this.removePersisted();
        }
    };

    private persist = (tokens: TTokens) => {
        const json = JSON.stringify(tokens);

        this.storage.setItem(this.storageKey, json);
    };

    private removePersisted = () => {
        this.storage.removeItem(this.storageKey);
    };
}

export const auth = new Auth();
