import React, {FunctionComponent, useEffect, useState} from 'react';
import {Box, Container, CssBaseline, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Copyright} from "@mui/icons-material";
import AdminAppBar from "../components/AdminAppBar";
import AdminMenu from "../components/AdminMenu";
import {useDispatch} from "react-redux";
import {GlobalActionGetMenu, GlobalActionGetModules} from "../redux/global";

interface OwnProps {
}

type Props = OwnProps;

const AdminPage: FunctionComponent<Props> = () => {
    const theme = useTheme()
    const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        setOpen(state => !state);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setOpen(!isDevice)
    }, [isDevice])
    useEffect(() => {
        // @ts-ignore
        dispatch(GlobalActionGetMenu())
        dispatch(GlobalActionGetModules())

        console.log("dispatch admin Page")
    }, [])
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div style={{display: "flex"}}>
            <CssBaseline/>
            <AdminAppBar open={open} onClick={handleDrawerOpen}/>
            <AdminMenu open={open} onClick={handleDrawerClose}/>
            <Box display={"flex"} flexDirection={"column"} flexGrow={1} minHeight={"100vh"} overflow={"auto"} m={0}>
                <div/>
                <Box p={1} height={"100%"}>
                    <Outlet/>

                </Box>
                <Box padding={1} display={"flex"} justifyContent={"center"} marginTop={"auto"} bgcolor={"primary"} color="contrastText">
                    <Container maxWidth="sm">
                        <Typography variant="body1">My sticky footer can be found here.</Typography>
                        <Copyright/>
                    </Container>
                </Box>
            </Box>
        </div>
    );
};

export default AdminPage;


