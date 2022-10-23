import React from 'react';
import {useSelector} from "react-redux";
import {IGeneralStore} from "../redux";

interface OwnProps {
    keyAccess: string
    type?: "inputs" | "headers" | "itemStructure" | "initialValues"
}

type Props = OwnProps;

const useExecutor = ({keyAccess, type}: Props): any => {
    const menu = useSelector((store: IGeneralStore) => store.global.menu)
    // @ts-ignore
    if (!menu) return (...args: string[]) => {
    }
    const access = menu.map(module => module?.access?.find(access => access.keyName == keyAccess)).find(value => value)
    if (!access) return (...args: string[]) => {
    }
    switch (type) {
        case "headers":
        case "inputs":
            if (!access[type]) return (...args: string[]) => {
            }
            return eval(`(${access[type]})`).executor
        case "itemStructure":
        case "initialValues":
            return access[type]
        default:
            if (!type) return access.filters

    }
};

export default useExecutor;
