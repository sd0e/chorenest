import React from 'react';
import { SchoolOutlined, SourceOutlined, InsightsOutlined, LeaderboardOutlined, SettingsOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import classes from './LeftBar.module.css';
import LeftBarButton from './LeftBarButton';

export default function LeftBar({ Click }) {
	const path = window.location.pathname;
	
	return (
		<div className={classes.leftBarOuter}>
			<div>
				<Link className={classes.leftBarLogoLink} to="/" onClick={Click}>
					<span className={path === '/' ? classes.leftBarLogoSelected : classes.leftBarLogo}>n</span>
				</Link>
				<LeftBarButton Icon={SchoolOutlined} Path="/learn" Click={Click} />
				<LeftBarButton Icon={SourceOutlined} Path="/sources" Click={Click} />
				<LeftBarButton Icon={InsightsOutlined} Path="/insights" Click={Click} />
				<LeftBarButton Icon={LeaderboardOutlined} Path="/leaderboard" Click={Click} />
			</div>
			<div>
				<LeftBarButton Icon={SettingsOutlined} Path="/settings" Click={Click} />
				<LeftBarButton Icon={AccountCircleOutlined} Bottom Path="/account" Click={Click} />
			</div>
		</div>
	)
}