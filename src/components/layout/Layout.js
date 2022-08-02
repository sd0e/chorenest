import React, { useState } from 'react';
import { createTheme, ThemeProvider, IconButton, SwipeableDrawer } from '@mui/material';
import { Menu, MotionPhotosAuto } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import classes from './Layout.module.css';
import LeftBar from '../ui/LeftBar';

export default function Layout({ children }) {
	const desktopMinWidth = 550;

	const [isMobile, setIsMobile] = useState(window.innerWidth < desktopMinWidth);
	const [navBarOpen, setNavBarOpen] = useState(false);

	const checkIsMobile = () => {
		const windowWidth = window.innerWidth;

		if (windowWidth >= desktopMinWidth && isMobile) setIsMobile(false);
		else if (windowWidth < desktopMinWidth && !isMobile) setIsMobile(true);
	}

	window.addEventListener('resize', checkIsMobile, true);

	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	if (isMobile) {
		return (
			<div className={classes.mobileHolder}>
				<ThemeProvider theme={theme}>
					<SwipeableDrawer
						anchor="left"
						open={navBarOpen}
						onClose={() => setNavBarOpen(false)}
						onOpen={() => setNavBarOpen(true)}
					>
						<div className={classes.mobileLeftBarHolder}>
							<LeftBar Click={() => setNavBarOpen(false)} />
						</div>
					</SwipeableDrawer>
					<div className={classes.mobileHeader}>
						<div className={classes.mobileMenuButtonHolder}>
							<IconButton onClick={() => setNavBarOpen(true)}><Menu /></IconButton>
						</div>
						<div className={classes.mobileHeaderLogoHolder}>
							<Link className={classes.mobileHeaderLogoLink} to="/">
								<span className={classes.mobileHeaderLogo}>n</span>
							</Link>
						</div>
					</div>
					<div className={classes.mobilePageHolder}>
						{ children }
					</div>
				</ThemeProvider>
			</div>
		)
	} else {
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
}