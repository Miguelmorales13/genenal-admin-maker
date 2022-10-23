import {IAccess} from "../access/IAccess";

export interface IRol {
    id?: number
    name?: string
    access: IAccess[]
}
