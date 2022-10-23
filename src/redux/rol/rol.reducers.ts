import {RolState} from "./rol.state";
import {IAction} from "../index";

export enum EnumRolRedux {
    Set = 'RolesSet',
    SetLoader = 'RolesSetLoader',
    SetList = 'RolesSetList',
    Add = 'RolesAdd',
    Update = 'RolesUpdate',
    Delete = 'RolesDelete'
}

export const RolesReducer = function (state = RolState, {type, payload}: IAction<EnumRolRedux, any>) {
    switch (type) {
        case EnumRolRedux.SetLoader:
            return {
                ...state,
                loading: payload
            }
        case EnumRolRedux.Set:
            return {
                ...state,
                selected: Object.assign({}, payload ? payload : {access: []})
            }
        case EnumRolRedux.SetList:
            return {
                ...state,
                roles: payload
            }
        case EnumRolRedux.Add:
            return {
                ...state,
                roles: [...state.roles, payload]
            }
        case EnumRolRedux.Delete:
            return {
                ...state,
                roles: state.roles.filter((rol) => rol.id !== payload)
            }
        case EnumRolRedux.Update:
            return {
                ...state,
                roles: [...state.roles.filter(rol => rol.id !== payload.id), payload]
            }
        default:
            return state
    }
}
