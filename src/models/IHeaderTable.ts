import {EnumColumnTable} from "../data-modeler";

export interface IHeaderTable {
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    type: EnumColumnTable;
    field: any;
    size?: any;
    headerName: string;
}
