import React from 'react';
import { motion } from 'framer-motion';

import Header from '../Header';

export default function Home() {
	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="account" />
			Account
		</motion.div>
	)
}