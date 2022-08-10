import React from 'react';

import classes from './ChoreStat.module.css';

export default function ChoreStat({ Icon, children }) {
	return (
		<div className={classes.choreStatContainer}>
			<div className={classes.choreStatOuter}>
				<Icon fontSize="small" className={classes.choreStatIcon} />
				<span className={classes.choreStatText}>{children}</span>
			</div>
		</div>
	)
}