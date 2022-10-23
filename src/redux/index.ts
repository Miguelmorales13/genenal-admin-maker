import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {AuthReducer, IAuthState} from "./auth";
import {IUsersState, UserActions, UsersReducer} from "./user";
import {GlobalReducer, IGlobalState} from "./global";
import {IRolesState, RolesActions, RolesReducer} from "./rol";


export interface IGeneralStore {
    auth: IAuthState
    global: IGlobalState,
    users: IUsersState
    roles: IRolesState
}

export interface IAction<T, D> {
    type: T
    payload: D
}

export const GlobalActions: any = {
    users: UserActions,
    roles: RolesActions
}


export const rootReducer = combineReducers({
    auth: persistReducer({key: 'auth', storage}, AuthReducer),
    global: persistReducer({key: 'global', storage}, GlobalReducer),
    users: UsersReducer,
    roles: RolesReducer,
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// @ts-ignore
const persist = persistStore(store)
export {
    store,
    persist
}

