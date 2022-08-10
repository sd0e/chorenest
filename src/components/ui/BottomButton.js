import { Button, createTheme, ThemeProvider } from '@mui/material'
import React from 'react'

export default function BottomButton({ Icon, onClick, children, color }) {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {

                    },
                },
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Button color={color}>
                <Icon fontSize="small" />
            </Button>
        </ThemeProvider>
    )
}