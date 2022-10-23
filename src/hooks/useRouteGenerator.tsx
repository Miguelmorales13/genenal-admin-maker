import React from 'react';
import {useSelector} from "react-redux";
import {GlobalActions, IGeneralStore} from "../redux";
import {FormValidators} from "../utils";
import GenericCrudPage from "../pages/admin/GenericCrudPage";
import HomePage from "../pages/HomePage";
import useAccessToForm from "./useAccessToForm";

interface OwnProps {
}

type Props = OwnProps;

const useRouteGenerator = ({}: Props) => {
    const accessToForm = useAccessToForm()
    const menu = useSelector((store: IGeneralStore) => store.global.menu)
    const store = useSelector((store: IGeneralStore) => store)

    let accesses = menu.reduce((previousValue: any[], currentValue) => {
        return [
            ...previousValue, ...currentValue.access
        ]
    }, []);

    let returned = accesses.map(value => {
        // @ts-ignore
        const selected = store[value.keyName].selected
        let initialValues: any = selected.id ? Object.assign({}, {...selected}) : {...value.initialValues}
        if (value.keyName == "roles") {
            initialValues = selected.id ? Object.assign({}, {...selected, accces: accessToForm}) : {...value.initialValues, access: accessToForm}
        }

        return {
            path: value.keyName,
            element: <GenericCrudPage
                NAME_PAGE={value.name}
                actions={GlobalActions[value.keyName]}
                initialValues={initialValues}
                KEY_STORE={value.keyName}
                ACCESS_KEY={value.keyName}
                schemaForValidation={FormValidators[value.keyName]}/>,
        }
    });
    return [{element: <HomePage/>, index: true}, ...returned]
};

export default useRouteGenerator;
