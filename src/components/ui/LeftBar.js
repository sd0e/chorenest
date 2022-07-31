import React from 'react';
import { SchoolOutlined, SourceOutlined, InsightsOutlined, LeaderboardOutlined, SettingsOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import classes from './LeftBar.module.css';
import LeftBarButton from './LeftBarButton';

export default function LeftBar() {
	const path = window.location.pathname;
	
	return (
		<div className={classes.leftBarOuter}>
			<div>
				<Link className={classes.leftBarLogoLink} to="/">
					<span className={path === '/' ? classes.leftBarLogoSelected : classes.leftBarLogo}>e</span>
				</Link>
				<LeftBarButton Icon={SchoolOutlined} Path="/learn" />
				<LeftBarButton Icon={SourceOutlined} Path="/sources" />
				<LeftBarButton Icon={InsightsOutlined} Path="/insights" />
				<LeftBarButton Icon={LeaderboardOutlined} Path="/leaderboard" />
			</div>
			<div>
				<LeftBarButton Icon={SettingsOutlined} Path="/settings" />
				<LeftBarButton Icon={AccountCircleOutlined} Bottom Path="/account" />
			</div>
		</div>
	)
}