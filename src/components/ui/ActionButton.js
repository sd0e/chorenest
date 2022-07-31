import React from 'react';
import { IconButton, createTheme, ThemeProvider } from '@mui/material';

export default function ActionButton({ Icon, Color, Click }) {
	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
		components: {
			MuiIconButton: {
				styleOverrides: {
					root: {
						backgroundColor: "rgba(255, 255, 255, 0.1)",
						padding: "0.75rem",
						borderRadius: "1.25rem"
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<IconButton onClick={Click}>
				<Icon sx={{ color: Color }} />
			</IconButton>
		</ThemeProvider>
	)
}