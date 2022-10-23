import React, {FunctionComponent, useState} from 'react';
import {useDispatch} from "react-redux";
import {EnumAuthReducers} from "../redux/auth";
import {AppBar, AppBarProps, Fade, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Link, useNavigate} from "react-router-dom";
import {Menu as MenuIcon, MoreVert} from "@mui/icons-material";
import {DRAWER_WIDTH} from "../themes/ThemeProviderGeneral";


interface OwnProps {
    open: boolean
    name?: string
    onClick: () => void
}

type Props = OwnProps;

interface AppBarStyles extends AppBarProps {
    open?: boolean;
}

const AppBarStyled = styled(
    AppBar,
    {shouldForwardProp: prop => prop !== 'open'}
)<AppBarStyles>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    })
}))
const ToolbarStyled = styled(Toolbar)(({theme}) => ({
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
}))


const AdminAppBar: FunctionComponent<Props> = ({open, onClick, name = 'home'}) => {
    const theme = useTheme()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: any) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = () => {
        dispatch({type: EnumAuthReducers.SetToken, payload: ""})
        dispatch({type: EnumAuthReducers.SetUser, payload: {}})
        handleClose()
    }
    const handleProfile = () => {
        navigate("/admin/profile")
        handleClose()
    }
    const menu = [
        {title: "logout", onclick: handleLogout},
        {title: "profile", onclick: handleProfile},
    ]
    const handleClose = () => {
        setAnchorEl(null);
    };
    const isDevice = useMediaQuery(theme.breakpoints.down('sm'))
    const isOpen = (isDevice && !open) || (!isDevice)
    return (
        <AppBarStyled position="absolute" color="primary" elevation={0} open={open}>
            <ToolbarStyled disableGutters>
                {isOpen && <IconButton
                    edge="start"
                    style={{marginRight: 0}}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onClick}
                >
                    <MenuIcon/>
                </IconButton>}
                <Typography component={Link} to="/admin" variant="h6" color="inherit" noWrap flexGrow={1} style={{textDecoration: 'none'}}>
                    E-Commerse
                </Typography>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClick}
                >
                    <MoreVert/>
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={openMenu}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    {menu.map(({onclick, title}, i) => <MenuItem key={i} onClick={onclick}>{title}</MenuItem>)}
                </Menu>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default AdminAppBar;
