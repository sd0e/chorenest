import React from 'react';

import Header from '../Header';
import { motion } from 'framer-motion';

export default function People() {
	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="People" />
			People
		</motion.div>
	)
}