import {IRol} from "../../models/roles/IRol";

export interface IRolesState {
    selected: IRol
    roles: IRol[]
    loading: boolean
}

export const RolState: IRolesState = {
    selected: {access: []},
    roles: [],
    loading: false
}

