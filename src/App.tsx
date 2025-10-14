import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Router } from 'router';
import { ThemeProvider } from 'theme';

export const App = () => {
    const queryClient = useMemo(() => new QueryClient(), []);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </QueryClientProvider>
    );
};
