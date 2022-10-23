import {EnumRolRedux} from "./index";
import Axios from "../../utils/axios.util";

export const RolesActions =
    {

        getAll: () => async function (dispatch: Function, getState: Function) {
            dispatch({type: EnumRolRedux.SetLoader, payload: true});
            try {
                const res = await Axios.get("roles");

                dispatch({type: EnumRolRedux.SetList, payload: res});
            } finally {
                dispatch({type: EnumRolRedux.SetLoader, payload: false});
            }
        },
        create: (rol: any) => async function (dispatch: Function, getState: Function) {
            dispatch({type: EnumRolRedux.SetLoader, payload: true});
            try {
                const res = await Axios.post("roles", rol);
                dispatch({type: EnumRolRedux.Add, payload: res});
                dispatch({type: EnumRolRedux.Set, payload: null});
            } finally {
                dispatch({type: EnumRolRedux.SetLoader, payload: false});
            }
        },
        update: (rol: any) => async function (dispatch: Function, getState: Function) {
            dispatch({type: EnumRolRedux.SetLoader, payload: true});
            try {
                const res = await Axios.patch(`roles/${rol.id}`, rol);
                dispatch({type: EnumRolRedux.Update, payload: res});
                dispatch({type: EnumRolRedux.Set, payload: null});
            } finally {
                dispatch({type: EnumRolRedux.SetLoader, payload: false});
            }
        },
        delete: (id: number) => async function (dispatch: Function, getState: Function) {
            dispatch({type: EnumRolRedux.SetLoader, payload: true});
            try {
                await Axios.delete(`roles/${id}`);
                dispatch({type: EnumRolRedux.Delete, payload: id});
                dispatch({type: EnumRolRedux.Set, payload: null});
            } finally {
                dispatch({type: EnumRolRedux.SetLoader, payload: false});
            }
        }
    }
