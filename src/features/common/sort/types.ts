export type TSortDir = 'asc' | 'desc';

export type TParamsWithSort<T, Sort = string> = T & {
    sort?: Sort;
    sortDir?: TSortDir;
};
