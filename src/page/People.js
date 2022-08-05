import React, { useState, useEffect } from 'react';

import Header from '../Header';
import { motion } from 'framer-motion';
import fetch from '../firebase/fetch';
import PersonInfo from '../components/ui/PersonInfo';

export default function People({ user }) {
	const [userList, setUserList] = useState('Loading');
	const [owner, setOwner] = useState('Loading');

	let lastTriggered = 0;

	const newLastTriggered = () => {
		lastTriggered = new Date().getTime();
	}

	const fetchUsers = () => {
		if (user.approved) {
			fetch(`/households/${user.householdId}/users`).then(users => {
				setUserList(users);

				fetch(`/households/${user.householdId}/owner`).then(fetchedOwner => {
					setOwner(fetchedOwner);
				})
			});
		}
	}

	useEffect(() => {
		if (!lastTriggered || new Date().getTime() - lastTriggered >= 20) {
			newLastTriggered();
			fetchUsers();
		}
	}, []);

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="People" />
			{ user.approved ?
				userList === 'Loading' || owner === 'Loading' ?
					<span>Loading</span>
				:
					<div>
						{Object.keys(userList).map((userId, idx) => {
							const userInfo = userList[userId];
							return <PersonInfo json={userInfo} userId={userId} first={idx === 0} uid={user.uid} key={userId} change={fetchUsers} isAdmin={user.admin} owner={owner} householdId={user.householdId} />
						})}
					</div>
			:
				<span>You cannot view this yet, since you have not been approved.</span>
			}
		</motion.div>
	)
}