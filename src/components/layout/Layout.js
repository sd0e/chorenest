import React from 'react';

import classes from './Layout.module.css';
import LeftBar from '../ui/LeftBar';

export default function Layout({ children }) {
	return (
		<div className={classes.layoutOuter}>
			<div className={classes.leftBarHolder}>
				<LeftBar />
			</div>
			<div className={classes.pageHolder}>
				{ children }
			</div>
		</div>
	)
}