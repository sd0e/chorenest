import React, { useState } from 'react';

import Header from '../Header';
import { motion } from 'framer-motion';

export default function Chores({ user }) {
	const [choreType, setChoreType] = useState('you');

	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="Chores" />
			{ user.admin &&  }
		</motion.div>
	)
}