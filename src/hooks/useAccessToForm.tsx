import React from "react";
import {useSelector} from "react-redux";
import {IModuleForm} from "../models/access/IModuleForm";
import {IGeneralStore} from "../redux";

const useAccessToForm = () => {
    const access = useSelector((store: IGeneralStore) => store.roles.selected.access)
    const modules = useSelector((store: IGeneralStore) => store.global.menu)
    const accessToForm = modules.map((module) => {
        let accessesFromModuleWanted = access.filter((m) => m.moduleId === module.id);
        return {
            moduleId: module.id,
            name: module.name,
            type: module.type,
            isDone: accessesFromModuleWanted.length > 0,
            accesses: module.access?.map(access => {
                if (accessesFromModuleWanted && accessesFromModuleWanted.length <= 0) {
                    return {
                        isDone: false,
                        accessId: access.id,
                        name: access.name,
                        permission: false
                    };
                }
                let wantedAccess: any = accessesFromModuleWanted.find((a) => a.id === access.id);
                if (!wantedAccess) {
                    return {
                        isDone: false,
                        accessId: access.id,
                        name: access.name,
                        permission: false
                    };
                }
                return {
                    isDone: true,
                    accessId: access.id,
                    name: access.name,
                    permission: wantedAccess.permission === "2"
                };
            })
        };
    }) as IModuleForm[]

    return accessToForm

}
export default useAccessToForm
