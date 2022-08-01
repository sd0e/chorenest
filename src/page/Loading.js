import React from 'react';
import { LinearProgress } from '@mui/material';

export default function Loading() {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<LinearProgress />
		</div>
	)
}