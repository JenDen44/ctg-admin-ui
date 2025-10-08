import { createTheme } from '@mui/material/styles';
import { components, shadows, shape } from './commonTheme';

export const darkTheme = createTheme({
    shape,
    shadows,
    components: components('dark'),
    palette: {
        mode: 'dark',
        primary: {
            main: '#F3C26E',
            light: '#FFD993',
            dark: '#C79D50',
            contrastText: '#1E140E',
        },
        secondary: {
            main: '#D0844F',
            light: '#E7A471',
            dark: '#A86536',
            contrastText: '#1E140E',
        },

        background: {
            default: '#1E140E',
            paper: '#2B1B12',
        },
        text: {
            primary: '#FFF2E6',
            secondary: '#E0C7AE',
        },
        divider: '#5B4536',

        error: {
            main: '#FF5A3C',
            light: '#FF8A70',
            dark: '#C53C21',
            contrastText: '#FFFFFF',
        },
    },
});
