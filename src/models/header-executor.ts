import {IHeaderTable} from "./IHeaderTable";

export interface HeaderExecutor {

    executor: (...args: string[]) => IHeaderTable[];
}
