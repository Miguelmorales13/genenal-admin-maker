import React, {ComponentProps, FunctionComponent} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {IGeneralStore} from "../redux";

interface OwnProps extends ComponentProps<any> {
}

type Props = OwnProps;

const PublicRoute: FunctionComponent<Props> = (props) => {
    let {token} = useSelector((state: IGeneralStore) => state.auth);
    if (!token || token == '') return <Navigate to={"/"}/>
    return (<Outlet/>);
};

export default PublicRoute;
