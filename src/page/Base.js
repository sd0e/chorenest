import React from 'react';
import { motion } from 'framer-motion';
import { Google, Login, PersonAdd } from '@mui/icons-material';

import Header from '../Header';
import classes from './Base.module.css';
import signInUser from '../firebase/signInUser';
import config from '../config.json';
import MaterialButton from '../components/ui/MaterialButton';

export default function Base() {
	return (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={classes.baseOuterContainer}>
            <Header NoAuth />
            <h2 className={classes.heading}>{config.name}</h2>
            <span className={classes.subheading}>{config.short_description}</span>
            <MaterialButton color="primary" onClick={signInUser} style={{ marginBottom: '2rem' }} Icon={Google}>Continue with Google</MaterialButton>

            <br />

            <MaterialButton color="secondary" onClick={signInUser} style={{ marginRight: '1rem' }} Icon={Login}>Sign In</MaterialButton>
            <MaterialButton color="success" onClick={signInUser} Icon={PersonAdd}>Sign Up</MaterialButton>
		</motion.div>
	)
}