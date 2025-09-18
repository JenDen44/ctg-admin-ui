import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Router } from 'router';

export const App = () => {
    const queryClient = useMemo(() => new QueryClient(), []);

    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Router />
        </QueryClientProvider>
    );
};
