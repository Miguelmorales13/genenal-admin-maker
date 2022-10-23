import {AuthState, IAuthState} from "./auth.state";
import {IAction} from "../index";

export enum EnumAuthReducers {
    SetToken = 'AuthSetToken',
    SetUser = 'AuthSetUser',
    SetLoader = 'AuthSetLoader'
}

export const AuthReducer = (state: IAuthState = AuthState, {payload, type}: IAction<EnumAuthReducers, any>): IAuthState => {
    switch (type) {
        case EnumAuthReducers.SetLoader:
            return {...state, loading: payload}
        case EnumAuthReducers.SetToken:
            return {...state, token: payload}
        case EnumAuthReducers.SetUser:
            return {...state, user: payload}
        default:
            return state
    }
}
