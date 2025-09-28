import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { apiErrorSchema } from './schemas';

export const zodErrorToApiError = (error: ZodError) => ({
    title: 'Validation Error',
    message: 'Некорректные данные',
    code: 400,
    fields: error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
    })),
});

export const toApiError = (error: unknown) => {
    if (error instanceof AxiosError) {
        const parsedError = apiErrorSchema.safeParse(error);

        if (parsedError.success) {
            return parsedError.data;
        }

        return {
            title: 'Unexpected API error',
            message:
                typeof error.response?.data === 'string' ? error.response.data : (error.message ?? 'Unknown error'),
            code: error.response?.status ?? -1,
            fields: null,
        };
    }

    if (error instanceof ZodError) {
        return zodErrorToApiError(error);
    }

    return {
        title: 'Unexpected error',
        message: error instanceof Error ? error.message : String(error),
        code: -1,
        fields: null,
    };
};
