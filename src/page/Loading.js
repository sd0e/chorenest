import React from 'react';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider, LinearProgress, Box } from '@mui/material';

export default function Loading() {
	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
        <motion.div initial={{ opacity: 0, scale: 0.4 }} transition={1} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
			<div style={{ width: '70%', textAlign: 'center' }}>
				<span style={{ fontSize: '6rem', fontWeight: 600, display: 'block', marginBottom: '10rem', color: 'rgba(255, 255, 255, 0.2)' }}>n</span>
				<ThemeProvider theme={theme}>
					<Box sx={{ width: '100%', color: 'rgba(255, 255, 255, 0.4)' }}>
						<LinearProgress color="inherit" />
					</Box>
				</ThemeProvider>
			</div>
		</motion.div>
	)
}