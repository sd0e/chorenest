import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup, Fab } from '@mui/material';
import { AccountCircleOutlined, AddTaskOutlined, PeopleAltOutlined } from '@mui/icons-material';

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
				fetchChores(newAlignment);
				setChoreType(newAlignment);
			}
		}
	}

	const organiseAllChores = (chores, users) => {
		const usersKeys = Object.keys(users);

		let allChores = [];
		
		usersKeys.forEach(userId => {
			const activeUserChores = chores.active.assignee[userId];

			const activeUserChoreKeys = Object.keys(activeUserChores);

			activeUserChoreKeys.forEach(activeUserChoreKey => {
				let activeUserChore = activeUserChores[activeUserChoreKey];
				activeUserChore.id = activeUserChoreKey;

				allChores.push(activeUserChore);

				// continue here
			})
		});
	}

	const fetchChores = (type) => {
		if (type === 'you') {
			fetch(`/households/${user.householdId}/chores/active/assignee/${user.uid}`).then(chores => {
				setChoreList(chores);
			});
		} else {
			fetch(`/households/${user.householdId}/chores`).then(chores => {
				let users = {};

				const checkAllComplete = () => {
					let ready = true;

					const usersKeys = Object.keys(users);
					for (let idx = 0; idx < usersKeys.length; idx++) {
						const userId = usersKeys[idx];

						if (users[userId]['exists'] && !('nickname' in users[userId])) {
							ready = false;
						}
					}

					if (ready) organiseAllChores(chores, users);
				}

				const addNickname = (userId, nickname) => {
					users[userId]['nickname'] = nickname;
					checkAllComplete();
				}
				
				Object.keys(chores.active.assignee).forEach(userId => {
					users[userId] = { 'exists': true };
					fetch(`/households/${user.householdId}/users/${userId}/nickname`).then(nickname => {
						addNickname(userId, nickname);
					});
				});
			});
		}
	}

	let lastTriggered = 0;

	const newLastTriggered = () => {
		lastTriggered = new Date().getTime();
	}

	useEffect(() => {
		if (!lastTriggered || new Date().getTime() - lastTriggered >= 20) {
			newLastTriggered();
			fetchChores('you');
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
				{ user.admin && <Fab color="secondary" aria-label="add" style={{ margin: 0, position: 'fixed', bottom: 50, right: 50, top: 'auto', left: 'auto' }}>
					<AddTaskOutlined style={{ color: '#ffffff' }} />
				</Fab> }
				{ choreList === 'Loading' ?
					<span>Loading</span>
				:
					choreList ?
						Object.keys(choreList).map((choreId, idx) => {
							const choreInfo = choreList[choreId];
							return <ChoreInfo user={user} choreId={ choreType === 'you' ? choreId : choreInfo.id } choreInfo={choreInfo} key={choreId} first={idx === 0} onComplete={fetchChores} type={choreType} />
						})
					:
						<NoChores /> }
			</ThemeProvider>
		</motion.div>
	)
}