import React from 'react';

import classes from './PersonInfo.module.css';
import PersonStatus from './PersonStatus';

export default function PersonInfo({ json, userId, first, uid }) {
    // userId is the person being displayed's uid, whereas uid is the uid of the person currently signed in

    let type;
    if (!json.approved) type = 'notApproved';
    else if (userId === uid) type = 'you';
    else if (json.approved) type = 'approved';
    
    return (
        <div className={classes.personInfoOuter} style={{ marginTop: first ? '0rem' : '1.75rem' }}>
            <PersonStatus type={type} />
        </div>
    )
}