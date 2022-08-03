import React from 'react';
import { createTheme, ThemeProvider, Button } from '@mui/material';

export default function MaterialButton({ children, Icon, onClick, style, color }) {
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
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						fontFamily: '"Inter", sans-serif',
                        fontWeight: 600,
					},
				},
			},
		},
    });

	return (
		<ThemeProvider theme={theme}>
			<Button variant="outlined" color={color} onClick={onClick} style={style}>
				<Icon fontSize="small" style={{ marginRight: '0.5rem' }} />
				{ children }
			</Button>
		</ThemeProvider>
	)
}