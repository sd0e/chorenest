import React from 'react';
import { Link } from 'react-router-dom';

import classes from './LeftBar.module.css';

export default function LeftBarButton({ Icon, Bottom, Path, Click }) {
	const windowPath = window.location.pathname;
	const selected = windowPath === Path;

	return (
		<Link to={Path} className={classes.leftBarButtonLink} onClick={Click}>
			<Icon className={selected ? (Bottom ? classes.leftBarIconSelectedBottom : classes.leftBarIconSelected) : (Bottom ? classes.leftBarIconBottom : classes.leftBarIcon)} />
		</Link>
	)
}