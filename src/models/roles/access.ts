export interface Access {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
    name: string;
    keyName: string;
    icon: string;
    description: string;
    headers: any;
    initialValues: any;
    itemStructure: any[];
    filters: string[];
    inputs: any;
    moduleId: number;

}
