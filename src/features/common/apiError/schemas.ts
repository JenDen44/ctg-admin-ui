import z from 'zod';

export const apiErrorFieldSchema = z.object({
    field: z.string(),
    message: z.string(),
});

export const apiErrorSchema = z.object({
    title: z.string(),
    message: z.string(),
    code: z.number(),
    fields: z.array(apiErrorFieldSchema).nullable(),
});
