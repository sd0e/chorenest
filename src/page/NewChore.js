import React, { useState, useEffect } from 'react';

import Header from '../Header';
import { motion } from 'framer-motion';
import fetch from '../firebase/fetch';

export default function NewChore({ user }) {
	const [assignee, setAssignee] = useState(null);
	const [assigneeNickname, setAssigneeNickname] = useState('Not Present');

	const getAssigneeInfo = locAssignee => {
		console.log(user.householdId);
		fetch(`/households/${user.householdId}/users/${locAssignee}/nickname`).then(result => setAssigneeNickname(result));
	}

	useEffect(() => {
		console.log(window.newchoreuid);
		if (window.newchoreuid) {
			const tempNewChoreUid = window.newchoreuid;
			setAssignee(tempNewChoreUid);
			window.newchoreuid = undefined;
			getAssigneeInfo(tempNewChoreUid);
		}	
	}, []);

	console.log(assigneeNickname);

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="New Chore" />
			New Chore
			Assignee = <span>{assignee}</span>
			AssigneeNickname = <span>{assigneeNickname}</span>
		</motion.div>
	)
}