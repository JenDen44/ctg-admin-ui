import { alpha, type Shadows } from '@mui/material';
import type { TThemeMode } from './types';

export const shape = { borderRadius: 16 } as const;

export const shadows = [
    'none',
    '0 1px 2px rgba(0,0,0,.08)',
    '0 2px 8px rgba(0,0,0,.12)',
    '0 10px 30px rgba(0,0,0,.18)',
    ...Array(21).fill('0 10px 30px rgba(0,0,0,.18)'),
] as Shadows;

export const components = (mode: TThemeMode) =>
    ({
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    // fontFamily: sfStack as unknown as string,
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    background:
                        mode === 'light'
                            ? 'linear-gradient(180deg,#FAF6F1 0%,#F5EDE5 100%)'
                            : 'linear-gradient(180deg,#1E140E 0%,#100A06 100%)',
                },
                '.mac-glass': {
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    background: mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(43,27,18,0.55)',
                    border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 20,
                    boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: { borderRadius: 20, boxShadow: shadows[3] },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    fontWeight: 600,
                    textTransform: 'none',
                    paddingInline: 20,
                    paddingBlock: 14,
                    minHeight: 56,
                    letterSpacing: 0,
                    transition: 'all 0.15s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: `0 3px 10px ${mode === 'light' ? alpha('#9B4F2E', 0.25) : alpha('#F3C26E', 0.3)}`,
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: 'none',
                    },
                },
                contained: {
                    fontSize: 16,
                    fontWeight: 600,
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: mode === 'light' ? 'rgba(155,79,46,0.06)' : 'rgba(255,255,255,0.08)',
                    '&:hover': {
                        backgroundColor: mode === 'light' ? 'rgba(155,79,46,0.1)' : 'rgba(255,255,255,0.12)',
                    },
                    '&.Mui-focused': {
                        backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(43,27,18,0.85)',
                    },
                },
                input: { paddingTop: 16, paddingBottom: 16, fontSize: 16 },
            },
        },
    }) as const;
