import { authClient } from 'client';
import { userSchema, usersResponseSchema } from 'features';
import type { TNewUser, TUsersParams, TUsersResponse, TUser, TUpdatedUser } from 'features';

const USERS_URL = '/users';

const USERS_ID_URL = (id: number) => `${USERS_URL}/${id}`;

const USERS_CURRENT_URL = `${USERS_URL}/current`;

export const getUsers = async (params: TUsersParams) => {
    const response = await authClient.get<TUsersResponse>(USERS_URL, { params, schema: usersResponseSchema });

    return response.data;
};

export const createUser = async (data: TNewUser) => {
    const response = await authClient.post<TUser>(USERS_URL, data, { schema: userSchema });

    return response.data;
};

export const getUser = async (id: number) => {
    const url = USERS_ID_URL(id);
    const response = await authClient.get<TUser>(url, { schema: userSchema });

    return response.data;
};

export const updateUser = async (id: number, data: TUpdatedUser) => {
    const url = USERS_ID_URL(id);
    const response = await authClient.put<TUser>(url, data, { schema: userSchema });

    return response.data;
};

export const deleteUser = async (id: number) => {
    const url = USERS_ID_URL(id);

    await authClient.delete(url);
};

export const getCurrentUser = async () => {
    const response = await authClient.get<TUser>(USERS_CURRENT_URL, { schema: userSchema });

    return response.data;
};

export const updateCurrentUser = async (data: TUpdatedUser) => {
    const response = await authClient.put<TUser>(USERS_CURRENT_URL, data, { schema: userSchema });

    return response.data;
};
