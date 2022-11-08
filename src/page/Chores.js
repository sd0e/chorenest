import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, Button, TextField } from '@mui/material';
import { AccountCircleOutlined, AddTaskOutlined, PeopleAltOutlined } from '@mui/icons-material';

import Header from '../Header';
import fetch from '../firebase/fetch';
import ChoreInfo from '../components/ui/ChoreInfo';
import NoChores from '../components/ui/NoChores';
import { Link } from 'react-router-dom';

export default function Chores({ user }) {
	const [open, setOpen] = useState(false);
	const [openChoreId, setOpenChoreId] = useState('');
	const [choreName, setChoreName] = useState('');
	const [choreType, setChoreType] = useState('you');
	const [choreList, setChoreList] = useState('Loading');

	const handleTypeChange = (e, newAlignment) => {
		if (newAlignment) {
			if (user.admin || newAlignment === 'you') {
				if (newAlignment !== choreType) setChoreList('Loading');

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
				activeUserChore.assigneeNickname = users[userId].nickname;

				allChores.push(activeUserChore);
			});
		});

		setChoreList(allChores);
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

	const openEdit = editChoreId => {
		setOpenChoreId(editChoreId);
		setChoreName(choreList[editChoreId]['name']);
		setOpen(true);
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
				<Dialog open={open} onClose={() => setOpen(false)} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(5px)', height: '100%' }} component={motion.div} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
					<div style={{ padding: '2rem', backgroundColor: '#141313', textAlign: 'center' }}>
						<DialogTitle>Edit Chore</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Edit the selected chore
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Name"
								fullWidth
								onChange={event => setChoreName(event.target.value)}
								value={choreName}
								style={{ marginTop: '2rem', marginBottom: '1rem' }}
							/>
						</DialogContent>

						<Button variant="outlined" color="secondary" sx={{ marginRight: '0.5rem' }} onClick={() => setOpen(false)}>Cancel</Button>
						<Button variant="outlined" color="primary">Create</Button>
					</div>
				</Dialog>
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
						choreType === 'you' ?
							Object.keys(choreList).map((choreId, idx) => {
								const choreInfo = choreList[choreId];
								return <ChoreInfo user={user} choreId={ choreId } choreInfo={choreInfo} key={choreId} first={idx === 0} onComplete={fetchChores} type={choreType} openEdit={() => openEdit(choreId)} />
							})
						:
							choreList.map((choreInfo, idx) => {
								return <ChoreInfo user={user} choreId={ choreInfo.id } choreInfo={choreInfo} key={`chore${idx}`} first={idx === 0} onComplete={fetchChores} type={choreType} openEdit={() => openEdit(choreInfo.id)} />
							})
					:
						<NoChores /> }
				{ user.admin && <Link to="/new">
					<Fab color="secondary" aria-label="add" style={{ margin: 0, position: 'fixed', bottom: 50, right: 50, top: 'auto', left: 'auto' }}>
						<AddTaskOutlined style={{ color: '#ffffff' }} />
					</Fab>
				</Link> }
			</ThemeProvider>
		</motion.div>
	)
}