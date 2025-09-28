import type z from 'zod';
import type { userRoleSchema, userSchema, usersResponseSchema } from './schemas';
import type { TParamsWithPagination, TParamsWithSort } from 'features/common';

export type TUserRole = z.infer<typeof userRoleSchema>;

export type TUser = z.infer<typeof userSchema>;

export type TUsersResponse = z.infer<typeof usersResponseSchema>;

type TParams = {
    search?: string;
    roles?: TUserRole[];
};

export type TUsersParams = TParamsWithPagination<TParamsWithSort<TParams, keyof TUser>>;

export type TNewUser = {
    fullName: string;
    email: string;
    role: TUserRole;
    password: string;
};

export type TUpdatedUser = {
    fullName: string;
    email: string;
    role: TUserRole;
    password?: string;
};
