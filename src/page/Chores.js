import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AccountCircleOutlined, PeopleAltOutlined } from '@mui/icons-material';

import Header from '../Header';

export default function Chores({ user }) {
	const [choreType, setChoreType] = useState('you');

	const handleTypeChange = (e, newAlignment) => {
		if (newAlignment) {
			setChoreType(newAlignment);
		}
	}

	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
        typography: {
            fontFamily: [
                '"Inter"',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(','),
        },
	});

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="Chores" />
			<ThemeProvider theme={theme}>
				{ user.admin && <ToggleButtonGroup color="primary" value={choreType} exclusive onChange={handleTypeChange}>
					<ToggleButton value="you">
						<AccountCircleOutlined fontSize="small" style={{ marginRight: '0.5rem' }} />
						You
					</ToggleButton>
					<ToggleButton value="all">
						<PeopleAltOutlined fontSize="small" style={{ marginRight: '0.5rem' }} />
						All
					</ToggleButton>
				</ToggleButtonGroup>}
			</ThemeProvider>
		</motion.div>
	)
}