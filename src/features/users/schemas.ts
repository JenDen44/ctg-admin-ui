import z from 'zod';
import { createResponseWithPaginationSchema } from 'features/common';

export const userRoleSchema = z.enum(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']);

export const userSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    role: userRoleSchema,
});

export const usersResponseSchema = createResponseWithPaginationSchema(userSchema);
