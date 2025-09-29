import z from 'zod';
import type { core } from 'zod';

export const createResponseWithPaginationSchema = <T extends core.SomeType>(objectSchema: T) => {
    return z.object({
        content: z.array(objectSchema),
        pageNumber: z.number(),
        pageSize: z.number(),
        totalElements: z.number(),
        totalPages: z.number(),
    });
};
