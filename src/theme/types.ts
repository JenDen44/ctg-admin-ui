import type { Theme } from '@mui/material';

export type TThemeMode = 'light' | 'dark';

export type TThemeContext = {
    mode: TThemeMode;
    theme: Theme;
    toggle: () => void;
};
