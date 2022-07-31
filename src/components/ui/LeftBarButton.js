import React from 'react';
import { Link } from 'react-router-dom';

import classes from './LeftBar.module.css';

export default function LeftBarButton({ Icon, Bottom, Path }) {
	const windowPath = window.location.pathname;
	const selected = windowPath === Path;

	return (
		<Link to={Path} className={classes.leftBarButtonLink}>
			<Icon className={selected ? (Bottom ? classes.leftBarIconSelectedBottom : classes.leftBarIconSelected) : (Bottom ? classes.leftBarIconBottom : classes.leftBarIcon)} />
		</Link>
	)
}