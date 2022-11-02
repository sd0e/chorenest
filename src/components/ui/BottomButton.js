import { Button, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

import classes from './BottomButton.module.css';

export default function BottomButton({ Icon, onClick, children, color = 'default' }) {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            default: {
                main: 'rgba(255, 255, 255, 0.4)'
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                    },
                },
            },
        },
        typography: {
            fontFamily: [
                '"Inter"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(','),
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Button color={color} onClick={onClick}>
                <Icon fontSize="small" />
                <span className={classes.bottomButtonText}>{children}</span>
            </Button>
        </ThemeProvider>
    )
}