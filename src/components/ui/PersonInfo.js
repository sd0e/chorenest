import React from 'react';
import { createTheme, ThemeProvider, Switch, Stack, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import classes from './PersonInfo.module.css';
import PersonStatus from './PersonStatus';
import write from '../../firebase/write';
import ApproveReject from './ApproveReject';
import BottomButton from './BottomButton';
import { AddOutlined } from '@mui/icons-material';

export default function PersonInfo({ json, userId, first, uid, isAdmin, owner, householdId, change }) {
    // userId is the person being displayed's uid, whereas uid is the uid of the person currently signed in

    const navigate = useNavigate();

    let type;
    if (!json.approved) type = 'not approved';
    else if (userId === uid) type = 'you';
    else if (json.approved) type = 'approved';

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

    const toggleAdmin = () => {
        if (isAdmin) {
            write(`/households/${householdId}/users/${userId}/admin`, !json.admin).then(() => change())
        }
    }

    const onApprove = () => {
        if (isAdmin) {
            write(`/households/${householdId}/users/${userId}/approved`, true).then(() => change());
        }
    }

    const onReject = () => {
        if (isAdmin) {
            write(`/households/${householdId}/users/${userId}`, null).then(() => change());
        }
    }

    const adminToggleDisabled = owner === userId || !isAdmin;

    return (
        <div className={classes.personInfoOuter} style={{ marginTop: first ? '0rem' : '1.75rem' }}>
            <ThemeProvider theme={theme}>
                <PersonStatus type={type} />
                <span className={classes.nickname}>{json.nickname}</span>
                <span className={classes.email}>{json.email}</span>
                { json.approved ?
                    <Stack direction="row" spacing={2} style={{ marginTop: '1.5rem' }}>
                        <Tooltip title={adminToggleDisabled ? (!isAdmin ? 'You do not have sufficient permissions' : 'Owners cannot be demoted (owner role must first be deferred)') : 'Toggle Admin'}>
                            <div className={classes.adminToggleHolder}>
                                <Switch color="warning" size="small" checked={json.admin} disabled={adminToggleDisabled} onChange={toggleAdmin} />
                                <span className={classes.adminToggleText} style={{ color: json.admin ? '#fea642' : 'rgba(255, 255, 255, 0.4)', filter: owner === userId || (!isAdmin && json.admin) ? 'opacity(0.2)' : 'opacity(1)' }}>Admin</span>
                            </div>
                        </Tooltip>
                        <BottomButton Icon={AddOutlined} onClick={() => {
                            window.newchoreuid = userId;
                            navigate('/new');
                        }}>New Chore</BottomButton>
                    </Stack>
                :
                    isAdmin && <ApproveReject onApprove={onApprove} onReject={onReject} marginTop="1.5rem" />
                }
            </ThemeProvider>
        </div>
    )
}