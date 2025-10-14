import { createTheme } from '@mui/material/styles';
import { components, shadows, shape } from './commonTheme';

export const lightTheme = createTheme({
    shape,
    shadows,
    components: components('light'),
    palette: {
        mode: 'light',
        primary: {
            main: '#9B4F2E',
            light: '#B86A48',
            dark: '#6D351F',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#C78F5C',
            light: '#E0AB7E',
            dark: '#996B3D',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FDF8F2',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#3B2414',
            secondary: '#704830',
        },
        divider: '#E5D2C0',
        error: {
            main: '#D94B3C',
            light: '#EB7567',
            dark: '#A6362B',
            contrastText: '#FFFFFF',
        },
    },
});
