import { createContext } from 'react';
import { lightTheme } from './lightTheme';
import type { TThemeContext } from './types';

export const themeContext = createContext<TThemeContext>({ mode: 'light', theme: lightTheme, toggle: () => {} });
