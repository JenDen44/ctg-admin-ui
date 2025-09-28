import type { apiErrorFieldSchema, apiErrorSchema } from './schemas';
import type z from 'zod';

export type TApiErrorField = z.infer<typeof apiErrorFieldSchema>;

export type TApiError = z.infer<typeof apiErrorSchema>;
