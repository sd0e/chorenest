import React from 'react';
import { createTheme, ThemeProvider, Switch, Stack, Tooltip } from '@mui/material';
import { DoneAllOutlined, EventOutlined, EventRepeatOutlined } from '@mui/icons-material';

import classes from './ChoreInfo.module.css';
import ChoreStat from './ChoreStat';
import msToFrequency from '../../scripts/msToFrequency';
import BottomButton from './BottomButton';
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
                <Stack spacing={3} direction="column">
                    <Stack spacing={3} direction="row">
                        <ChoreStat Icon={EventOutlined}>{utcToRelative(choreInfo.due, '24', 'concat')}</ChoreStat>
                        { choreInfo.repeatFreq && <ChoreStat Icon={EventRepeatOutlined}>Every {msToFrequency(choreInfo.repeatFreq)}</ChoreStat> }
                    </Stack>
                    <Stack spacing={3} direction="row">
                        <BottomButton Icon={DoneAllOutlined} onClick={() => console.log('done')} color="success">Complete</BottomButton>
                    </Stack>
                </Stack>
            </ThemeProvider>
        </div>
    )
}