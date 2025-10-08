import { ThemeProvider as ThemeProviderMUI, CssBaseline } from '@mui/material';
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { themeContext } from './context';
import type { PropsWithChildren } from 'react';
import type { TThemeMode } from './types';

export const ThemeProvider = (props: PropsWithChildren) => {
    const { children } = props;
    const [mode, setMode] = useState<TThemeMode>(() =>
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    );
    const theme = mode == 'light' ? lightTheme : darkTheme;
    const toggle = () => setMode((oldMode) => (oldMode == 'light' ? 'dark' : 'light'));

    return (
        <themeContext.Provider value={{ mode, theme, toggle }}>
            <ThemeProviderMUI theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProviderMUI>
        </themeContext.Provider>
    );
};
