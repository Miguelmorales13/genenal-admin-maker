import {Menu} from "../../models/roles/module";
import {IModule} from "../../models/roles/IModule";

export interface IGlobalState {
    isDark: boolean
    loading: boolean
    menu: Menu[]
    modules: IModule[]
}

export const GlobalState: IGlobalState = {
    isDark: false,
    loading: false,
    menu: [],
    modules: []
}
