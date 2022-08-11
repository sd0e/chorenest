import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AccountCircleOutlined, PeopleAltOutlined } from '@mui/icons-material';

import Header from '../Header';
import fetch from '../firebase/fetch';
import ChoreInfo from '../components/ui/ChoreInfo';
import NoChores from '../components/ui/NoChores';

export default function Chores({ user }) {
	const [choreType, setChoreType] = useState('you');
	const [choreList, setChoreList] = useState('Loading');

	const handleTypeChange = (e, newAlignment) => {
		if (newAlignment) {
			if (user.admin || newAlignment === 'you') {
				setChoreType(newAlignment);
			}
		}
	}

	const fetchChores = () => {
		fetch(`/households/${user.householdId}/chores/active/assignee/${user.uid}`).then(chores => {
			setChoreList(chores);
		});
	}

	let lastTriggered = 0;

	const newLastTriggered = () => {
		lastTriggered = new Date().getTime();
	}

	useEffect(() => {
		if (!lastTriggered || new Date().getTime() - lastTriggered >= 20) {
			newLastTriggered();
			fetchChores();
		}
	}, []);

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
				{ user.admin && <ToggleButtonGroup value={choreType} exclusive onChange={handleTypeChange} style={{ marginBottom: '2rem', display: 'block' }}>
					<ToggleButton value="you" color="primary">
						<AccountCircleOutlined fontSize="small" style={{ marginRight: '0.5rem' }} />
						You
					</ToggleButton>
					<ToggleButton value="all" color="warning">
						<PeopleAltOutlined fontSize="small" style={{ marginRight: '0.5rem' }} />
						All
					</ToggleButton>
				</ToggleButtonGroup> }
				{ choreList === 'Loading' ?
					<span>Loading</span>
				:
					choreList ?
						Object.keys(choreList).map((choreId, idx) => {
							const choreInfo = choreList[choreId];
							return <ChoreInfo user={user} choreId={choreId} choreInfo={choreInfo} key={choreId} first={idx === 0} onComplete={fetchChores} />
						})
					:
						<NoChores /> }
			</ThemeProvider>
		</motion.div>
	)
}