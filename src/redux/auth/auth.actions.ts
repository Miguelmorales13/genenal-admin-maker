import {EnumAuthReducers} from "./auth.reducers";
import Axios from "../../utils/axios.util";
import {ISignIn} from "../../models/ISignIn";

export const AuthActionSignIn = (signIn: ISignIn) => async (dispatch: Function, getState: Function) => {
    dispatch({type: EnumAuthReducers.SetLoader, payload: true})
    try {
        const res: any = await Axios.post('auth/sign-in', signIn)
        if (res && res.token) {
            dispatch({type: EnumAuthReducers.SetUser, payload: res.user})
            dispatch({type: EnumAuthReducers.SetToken, payload: res.token})
        }
    } finally {
        dispatch({type: EnumAuthReducers.SetLoader, payload: false})

    }
}

export const AuthActionVerification = (token: string) => async (dispatch: Function, getState: Function) => {
    console.log(token)
    dispatch({type: EnumAuthReducers.SetLoader, payload: true})
    try {
        const res: any = await Axios.post('auth/verification', {}, {headers: {Authorization: `Bearer ${token}`}})
        console.log(res)
        if (res && res.token) {
            dispatch({type: EnumAuthReducers.SetUser, payload: res.user})
            dispatch({type: EnumAuthReducers.SetToken, payload: res.token})
        }
    } finally {
        dispatch({type: EnumAuthReducers.SetLoader, payload: false})

    }
}
