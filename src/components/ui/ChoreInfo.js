import React from 'react';
import { createTheme, ThemeProvider, Stack } from '@mui/material';
import { DoneAllOutlined, EventOutlined, EventRepeatOutlined } from '@mui/icons-material';

import classes from './ChoreInfo.module.css';
import ChoreStat from './ChoreStat';
import msToFrequency from '../../scripts/msToFrequency';
import BottomButton from './BottomButton';
import write from '../../firebase/write';
const utcToRelative = require('utctorelative');

export default function ChoreInfo({ user, choreId, choreInfo, first, onComplete }) {
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

    const completeChore = () => {
        if (choreInfo.repeat) {
            const newNumber = choreInfo.repetition + 1;
            
            const repeatCode = choreInfo.repeatUntil[0];
            if (repeatCode === 'r') {
                // fixed number of repetitions
                const numRepetitions = Number(choreInfo.repeatUntil.substr(1));
                if (newNumber > numRepetitions) {
                    write(`/households/${user.householdId}/chores/active/assignee/${user.uid}/${choreId}`, null).then(() => {
                        write(`/households/${user.householdId}/chores/complete/assignee/${user.uid}/${choreId}`, choreInfo).then(() => {
                            onComplete();
                        });
                    });
                } else {
                    write(`/households/${user.householdId}/chores/active/assignee/${user.uid}/${choreId}/repetition`, choreInfo.repetition + 1).then(() => onComplete());
                }
            } else {
                write(`/households/${user.householdId}/chores/active/assignee/${user.uid}/${choreId}/repetition`, choreInfo.repetition + 1).then(() => onComplete());
            }
        } else {
            write(`/households/${user.householdId}/chores/active/assignee/${user.uid}/${choreId}`, null).then(() => {
                write(`/households/${user.householdId}/chores/complete/assignee/${user.uid}/${choreId}`, choreInfo).then(() => {
                    onComplete();
                });
            });
        }
    }

    return (
        <div className={classes.choreInfoOuter} style={{ marginTop: first ? '0rem' : '1.75rem' }}>
            <ThemeProvider theme={theme}>
                <span className={classes.choreName}>{choreInfo.name}</span>
                <Stack spacing={2} direction="column">
                    <Stack spacing={3} direction="row" className={classes.choreStatOuter}>
                        <ChoreStat Icon={EventOutlined}>{utcToRelative(choreInfo.due, '24', 'concat')}</ChoreStat>
                        { choreInfo.repeatFreq && <ChoreStat Icon={EventRepeatOutlined}>Every {msToFrequency(choreInfo.repeatFreq)}</ChoreStat> }
                    </Stack>
                    <Stack spacing={3} direction="row">
                        <BottomButton Icon={DoneAllOutlined} onClick={completeChore} color="success">Complete</BottomButton>
                    </Stack>
                </Stack>
            </ThemeProvider>
        </div>
    )
}