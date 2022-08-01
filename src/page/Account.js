import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

import Header from '../Header';
import deleteUserAccount from '../firebase/deleteUserAccount';

export default function Home() {
	const deleteAccount = () => {
		deleteUserAccount();
	}

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="account" />
			<Button variant="outlined" color="error" onClick={deleteAccount}>Delete account</Button>
		</motion.div>
	)
}