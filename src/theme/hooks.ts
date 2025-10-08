import { useContext } from 'react';
import { themeContext } from './context';

export const useTheme = () => useContext(themeContext);
