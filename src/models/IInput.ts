import {EnumInput} from "./EnumInput";

export interface IInput<T = any, Option = any> {
    name: string,
    label: string,
    options?: Option[],
    type: EnumInput,
    // configuration filed to contain input
    configField: any
    // configurations to input charters
    configInput: T
}
