import React from 'react';
import { motion } from 'framer-motion';
import { DeleteForever, Logout } from '@mui/icons-material';

import Header from '../Header';
import deleteUserAccount from '../firebase/deleteUserAccount';
import signOutUser from '../firebase/signOutUser';
import MaterialButton from '../components/ui/MaterialButton';

export default function Account() {
	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ height: "100%" }}>
			<Header Title="Account" />
			<MaterialButton color="warning" onClick={signOutUser} style={{ marginRight: '1rem' }} Icon={Logout}>Sign Out</MaterialButton>
			<MaterialButton color="error" onClick={deleteUserAccount} Icon={DeleteForever}>Delete Account</MaterialButton>
		</motion.div>
	)
}