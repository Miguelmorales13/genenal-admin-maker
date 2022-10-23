import {IUser} from "../../models/IUser.model";

export interface IUsersState {
    selected: IUser
    users: IUser[]
    loading: boolean
}

export const UserState: IUsersState = {
    selected: {},
    users: [],
    loading: false
}

