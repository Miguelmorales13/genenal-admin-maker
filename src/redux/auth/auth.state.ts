import {IUser} from "../../models/IUser.model";

export interface IAuthState {
    token: string
    user: IUser
    loading: boolean
}

export const AuthState: IAuthState = {
    token: '',
    loading: false,
    user: {}
}
