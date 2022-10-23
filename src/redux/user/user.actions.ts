import {EnumUserRedux} from "./index";
import Axios from "../../utils/axios.util";
import {IUser} from "../../models/IUser.model";

export const UserActions = {
    getAll: () => async (dispatch: Function, getState: Function) => {
        dispatch({type: EnumUserRedux.SetLoader, payload: true});
        try {
            const res = await Axios.get("users");
            dispatch({type: EnumUserRedux.SetList, payload: res});
        } finally {
            dispatch({type: EnumUserRedux.SetLoader, payload: false});
        }
    },
    create: (item: IUser) => async (dispatch: Function, getState: Function) => {
        dispatch({type: EnumUserRedux.SetLoader, payload: true});
        try {
            const res = await Axios.post("users", item);
            dispatch({type: EnumUserRedux.Add, payload: res});
            dispatch({type: EnumUserRedux.Set, payload: null});
        } finally {
            dispatch({type: EnumUserRedux.SetLoader, payload: false});
        }
    },

    delete: (id: number) => async (dispatch: Function, getState: Function) => {
        dispatch({type: EnumUserRedux.SetLoader, payload: true});
        try {
            await Axios.delete(`users/${id}`);
            dispatch({type: EnumUserRedux.Delete, payload: id});
            dispatch({type: EnumUserRedux.Set, payload: null});
        } finally {
            dispatch({type: EnumUserRedux.SetLoader, payload: false});
        }

    },
    update: (item: IUser) => async (dispatch: Function, getState: Function) => {
        dispatch({type: EnumUserRedux.SetLoader, payload: true});
        try {
            const res = await Axios.patch(`users/${item.id}`, item);
            dispatch({type: EnumUserRedux.Update, payload: res});
            dispatch({type: EnumUserRedux.Set, payload: null});
        } finally {
            dispatch({type: EnumUserRedux.SetLoader, payload: false});
        }
    }
}


// class CategoryProductActions implements CrudModel<IUser> {
//     async getApp(): Promise<(dispatch: Function, getState: Function) => void> {
//         return async function (dispatch: Function, p2: Function) {
//             return;
//         }
//     }
//
//     async create(m: IUser): Promise<(dispatch: Function, getState: Function) => void> {
//         return async function (dispatch: Function, p2: Function) {
//             return;
//         }
//     }
//
//     async delete(id: number): Promise<(dispatch: Function, getState: Function) => void> {
//         return async function (dispatch: Function, p2: Function) {
//         };
//     }
//
//
//     async update(m: IUser): Promise<(dispatch: Function, getState: Function) => void> {
//         return async function (dispatch: Function, p2: Function) {
//         };
//     }
// }
