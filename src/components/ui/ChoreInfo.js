import React from 'react';
import { createTheme, ThemeProvider, Switch, Stack, Tooltip } from '@mui/material';

import classes from './ChoreInfo.module.css';
const utcToRelative = require('utctorelative');

export default function ChoreInfo({ user, choreId, choreInfo, first }) {
    const theme = createTheme({
        palette: {
            mode: 'dark',
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
        }
    });

    return (
        <div className={classes.choreInfoOuter} style={{ marginTop: first ? '0rem' : '1.75rem' }}>
            <ThemeProvider theme={theme}>
                <span className={classes.choreName}>{choreInfo.name}</span>
                <span>{utcToRelative(choreInfo.due)}</span>
            </ThemeProvider>
        </div>
    )
}