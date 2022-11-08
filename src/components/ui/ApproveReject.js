import React from 'react';
import { BlockOutlined, DoneAllOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';

import BottomButton from './BottomButton';

export default function ApproveReject({ onApprove, onReject, marginTop }) {
	return (
		<Stack direction="row" spacing={2} style={{ marginTop: marginTop }}>
			<BottomButton Icon={DoneAllOutlined} onClick={onApprove} color="success">Approve</BottomButton>
			<BottomButton Icon={BlockOutlined} onClick={onReject} color="error">Reject</BottomButton>
		</Stack>
	)
}