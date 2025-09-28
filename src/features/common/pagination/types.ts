import type z from 'zod';
import type { createResponseWithPaginationSchema } from './schemas';
import type { core } from 'zod';

export type TParamsWithPagination<T> = T & {
    page?: number;
    size?: number;
};

export type TResponseWithPagination<T extends core.SomeType> = z.infer<
    ReturnType<typeof createResponseWithPaginationSchema<T>>
>;
