import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

import Header from '../Header';
import classes from './Base.module.css';
import signInUser from '../firebase/signInUser';
import config from '../config.json';

export default function Base() {
    const signIn = () => {
        signInUser();
    }

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={classes.baseOuterContainer}>
			<Header NoAuth />
            <h2 className={classes.heading}>{config.name}</h2>
            <span className={classes.subheading}>{config.short_description}</span>
            <Button variant="outlined" color="primary" style={{ marginRight: '1rem' }} onClick={signIn}>Sign In</Button>
            <Button variant="outlined" color="success" onClick={signIn}>Sign Up</Button>
		</motion.div>
	)
}