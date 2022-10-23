import {Access} from "./access";

export interface Menu {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
    name: string;
    keyName: string;
    type: string;
    icon: string;
    description: string;
    access: Access[];

}
