import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

import Header from '../Header';
import classes from './Base.module.css';
import signInUser from '../firebase/signInUser';

export default function Home() {
    const signIn = () => {
        signInUser();
    }

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={classes.baseOuterContainer}>
			<Header />
            <h2 className={classes.heading}>Chore Nest</h2>
            <span className={classes.subheading}>Assign and Manage Chores</span>
            <Button variant="outlined" color="primary" style={{ marginRight: '1rem' }} onClick={signIn}>Sign In</Button>
            <Button variant="outlined" color="success" onClick={signIn}>Sign Up</Button>
		</motion.div>
	)
}