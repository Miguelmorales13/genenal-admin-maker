import {IAccessForm} from "./IAccessForm";

export interface IModuleForm {
    moduleId: number;
    name: string;
    isDone: boolean;
    accesses: IAccessForm[];
}
