import React, {FunctionComponent} from 'react';
// import MenuList from "./MenuList";
import {useSelector} from "react-redux";
import {DRAWER_WIDTH} from "../themes/ThemeProviderGeneral";
import {Avatar, Box, Drawer, DrawerProps, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useLocation, useNavigate} from "react-router-dom";
import {IGeneralStore} from "../redux";
import {Menu as MenuIcon} from "@mui/icons-material";
import Icon from '@mui/material/Icon';

interface OwnProps {
    open: boolean
    onClick: () => void
}

type Props = OwnProps;

interface AppBarStyled extends DrawerProps {
    open?: boolean;
}

const DrawerStyled = styled(
    Drawer,
    {shouldForwardProp: prop => prop !== 'open'}
)<AppBarStyled>(({theme, open}) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        ...(!open && {
            overflowX: 'hidden',
            border: 'none',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(0),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(0),
            },

        })
    }
}))
const ToolbarIconStyled = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
}))
const CardRootStyled = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderBottomRightRadius: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1)
}))
const ListItemStyled = styled(ListItem)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    cursor: "pointer",
}))


const AdminMenu: FunctionComponent<Props> = ({onClick, open}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const isDevice = useMediaQuery(theme.breakpoints.down('sm'))

    const userLogged = useSelector((store: IGeneralStore) => store.auth.user)
    const menu = useSelector((store: IGeneralStore) => store.global.menu)
    const isOpen = (open && isDevice)
    return (
        <DrawerStyled variant={"permanent"} open={open}>
            <ToolbarIconStyled>
                {isOpen && <IconButton onClick={onClick}>
                    <MenuIcon color={theme.palette.primary.contrastText as any}/>
                </IconButton>}
            </ToolbarIconStyled>
            <CardRootStyled>
                <Avatar style={{marginBottom: theme.spacing(1)}} src="profile.png"/>
                <div>
                    <Typography variant="overline" align="center" noWrap display="block" gutterBottom>
                        {userLogged.email}
                    </Typography>
                    <Typography variant="body2" align="center" display="block" gutterBottom>
                        {userLogged.name}
                    </Typography>
                </div>
            </CardRootStyled>
            {
                menu.map((menuItem, key) => (
                    <List key={key} component="nav" subheader={<ListSubheader color="primary" component="div">{menuItem.name}</ListSubheader>}>
                        {
                            menuItem.access.map((item, key2) => (
                                <ListItemStyled key={`menu-list-${key}-${key2}`} onClick={() => navigate(item.keyName)}
                                                style={location.pathname === item.keyName ? {backgroundColor: theme.palette.secondary.main} : {}}>
                                    <ListItemIcon>
                                        <Icon> {item.icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText style={{color: location.pathname !== item.keyName ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText}} primary={item.name}/>
                                </ListItemStyled>
                            ))

                        }
                    </List>
                ))
            }

        </DrawerStyled>
    );
};

export default AdminMenu;

