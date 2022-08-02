import React from 'react';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider, Button } from '@mui/material';
import { DeleteForever, Logout } from '@mui/icons-material';

import Header from '../Header';
import deleteUserAccount from '../firebase/deleteUserAccount';
import signOutUser from '../firebase/signOutUser';

export default function Home() {
	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	})

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<ThemeProvider theme={theme}>
				<Header Title="Account" />
				<Button variant="outlined" color="warning" onClick={signOutUser} style={{ marginRight: '1rem' }}>
					<Logout fontSize="small" style={{ marginRight: '0.5rem' }} />
					Sign Out
				</Button>
				<Button variant="outlined" color="error" onClick={deleteUserAccount}>
					<DeleteForever fontSize="small" style={{ marginRight: '0.5rem' }} />
					Delete Account
				</Button>
			</ThemeProvider>
		</motion.div>
	)
}