import { authClient } from 'client';
import { userSchema, usersResponseSchema } from 'features';
import type { TNewUser, TUsersParams, TUsersResponse, TUser, TUpdatedUser } from 'features';

export const getUsers = async (params: TUsersParams) => {
    const response = await authClient.get<TUsersResponse>('/users', { params, schema: usersResponseSchema });

    return response.data;
};

export const createUser = async (data: TNewUser) => {
    const response = await authClient.post<TUser>('/users', data, { schema: userSchema });

    return response.data;
};

export const getUser = async (id: number) => {
    const url = `/user/${id}`;
    const response = await authClient.get<TUser>(url, { schema: userSchema });

    return response.data;
};

export const updateUser = async (id: number, data: TUpdatedUser) => {
    const url = `/user/${id}`;
    const response = await authClient.put<TUser>(url, data, { schema: userSchema });

    return response.data;
};

export const deleteUser = async (id: number) => {
    const url = `/user/${id}`;

    await authClient.delete(url);
};

export const getCurrentUser = async () => {
    const response = await authClient.get<TUser>('/user/current', { schema: userSchema });

    return response.data;
};

export const updateCurrentUser = async (data: TUpdatedUser) => {
    const response = await authClient.put<TUser>('/user/current', data, { schema: userSchema });

    return response.data;
};
