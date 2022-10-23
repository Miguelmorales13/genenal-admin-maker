import {IAccess} from "../access/IAccess";

export interface IModule {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: null;
    name?: string;
    keyName?: string;
    type?: any;
    icon?: string;
    description?: string;
    access?: IAccess[]
}
