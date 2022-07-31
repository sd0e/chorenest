import React from 'react';
import LeftBar from '../ui/LeftBar';

import classes from './Layout.module.css';

export default function Layout({ Element }) {
	return (
		<div className={classes.layoutOuter}>
			<div className={classes.leftBarHolder}>
				<LeftBar />
			</div>
			<div className={classes.pageHolder}>
				<Element />
			</div>
		</div>
	)
}