import React from 'react';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider, Button } from '@mui/material';
import { Google, Login, PersonAdd } from '@mui/icons-material';

import Header from '../Header';
import classes from './Base.module.css';
import signInUser from '../firebase/signInUser';
import config from '../config.json';

export default function Base() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

	return (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={classes.baseOuterContainer}>
            <ThemeProvider theme={theme}>
                <Header NoAuth />
                <h2 className={classes.heading}>{config.name}</h2>
                <span className={classes.subheading}>{config.short_description}</span>
                <Button variant="outlined" color="primary" style={{ marginBottom: '2rem' }} onClick={signInUser}>
                    <Google fontSize="small" style={{ marginRight: '0.5rem' }} />
                    Continue with Google
                </Button>

                <br />

                <Button variant="outlined" color="secondary" style={{ marginRight: '1rem' }} onClick={signInUser}>
                    <Login fontSize="small" style={{ marginRight: '0.5rem' }} />
                    Sign In
                </Button>
                <Button variant="outlined" color="success" onClick={signInUser}>
                    <PersonAdd fontSize="small" style={{ marginRight: '0.5rem' }} />
                    Sign Up
                </Button>
            </ThemeProvider>
		</motion.div>
	)
}