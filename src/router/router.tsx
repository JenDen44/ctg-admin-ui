import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './routes';

export const Router = () => {
    const router = useMemo(() => createBrowserRouter(routes), []);

    return <RouterProvider router={router} />;
};
