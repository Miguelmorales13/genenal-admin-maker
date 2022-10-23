import React, {ComponentProps, FunctionComponent} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {IGeneralStore} from "../redux";

interface OwnProps extends ComponentProps<any> {
}

type Props = OwnProps;

const PublicRoute: FunctionComponent<Props> = ({children}) => {
    let {loading, user, token} = useSelector((state: IGeneralStore) => state.auth);
    console.log("render")
    if (token && token != '') return <Navigate to={"/admin"}/>
    return (<Outlet/>);
};

export default PublicRoute;
