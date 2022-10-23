import {IInput} from "./IInput";

export interface FormExecutor {
    executor: (...args: string[]) => IInput[];
}
