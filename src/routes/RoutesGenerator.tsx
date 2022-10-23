import React, {FunctionComponent} from 'react';
import {useRoutes} from "react-router-dom";
import {IRoute} from "./routes";
import PublicRoute from "./PublicRoute";
import AdminPage from "../pages/AdminPage";
import PrivateRoute from "./PrivateRoute";
import SignInPage from "../pages/SignInPage";
import useRouteGenerator from "../hooks/useRouteGenerator";


interface OwnProps extends IRoute {
}

type Props = OwnProps;


const RoutesGenerator: FunctionComponent<Props> = () => {
    let useUsers = useRouteGenerator({});
    return useRoutes([

        {
            element: <PublicRoute/>,
            children: [
                {
                    element: <SignInPage/>,
                    path: '/',
                }
            ]
        },
        {
            element: <PrivateRoute/>,
            children: [
                {
                    element: <AdminPage/>,
                    path: '/admin',
                    children: useUsers
                }
            ]
        }
    ])
};

export default RoutesGenerator;
