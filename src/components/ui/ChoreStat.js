import React from 'react';

import classes from './ChoreStat.module.css';

export default function ChoreStat({ Icon, color, push, children }) {
	return (
		<div className={push ? classes.choreStatContainerPush : classes.choreStatContainer}>
			<div className={classes.choreStatOuter}>
				<Icon fontSize="small" className={classes.choreStatIcon} style={{ color: color ? color : 'rgba(255, 255, 255, 0.4)' }} />
				<span className={classes.choreStatText} style={{ color: color ? color : 'rgba(255, 255, 255, 0.4)' }}>{children}</span>
			</div>
		</div>
	)
}