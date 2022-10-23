import React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";

export const DRAWER_WIDTH = "300px";


function ThemeProviderGeneral({children}: any) {
    // @ts-ignore
    const theme = createTheme({
        palette: {
            primary: {
                light: '#3d84b8',
                main: '#3d84b8',
                dark: '#344fa1',
                contrastText: '#fff',
            },
            secondary: {
                light: '#f0ebcc',
                main: '#f0ebcc',
                dark: '#3d84b8',
                contrastText: '#3d84b8',
            },
            background: {
                default: '#f0ebcc',
                paper: '#f0ebcc',
            }
        },
    })
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderGeneral
