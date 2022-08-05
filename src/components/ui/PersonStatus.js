import { AccountCircleOutlined, DoneAllOutlined, WarningOutlined } from '@mui/icons-material';
import React from 'react';

import classes from './PersonStatus.module.css';

export default function PersonStatus({ type }) {
    let icon;
    if (type === 'you') icon = AccountCircleOutlined;
    else if (type === 'approved') icon = DoneAllOutlined;
    else if (type === 'notApproved') icon = WarningOutlined;

    return (
        <div className={classes.personStatusOuter}>
            <icon />
        </div>
    )
}