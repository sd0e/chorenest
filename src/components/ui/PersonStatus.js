import React from 'react';

import classes from './PersonStatus.module.css';
import PersonStatusIcon from './PersonStatusIcon';

export default function PersonStatus({ type }) {
    const StatusIcon = PersonStatusIcon(type);

    const color = type === 'not approved' ? '#F44435' : 'rgba(255, 255, 255, 0.4)';

    return (
        <div className={classes.personStatusOuter}>
            <StatusIcon fontSize="small" style={{ color: color }} />
            <span className={classes.text} style={{ color: color }}>{type}</span>
        </div>
    )
}