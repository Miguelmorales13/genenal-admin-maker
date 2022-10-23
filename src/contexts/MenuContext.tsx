import {createContext} from "react";
import {IDrawMenu} from "../models/IDrawMenu";
import {Person} from "@mui/icons-material";

const menu: IDrawMenu[] = [
    {
        title: '',
        items: [
            {
                icon: <Person/>,
                title: 'Home',
                path: '/admin'
            }
        ]

    }, {
        title: 'Administration',
        items: [
            {
                icon: <Person/>,
                title: 'Users',
                path: '/admin/users'
            }, {
                icon: <Person/>,
                title: 'Client',
                path: '/admin/users'
            }
        ]
    },
]
export const MenuContext = createContext(menu)

