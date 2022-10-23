import React, {FunctionComponent, useEffect} from 'react';
import Modal from "../../Modal";
import FormFlex from "../../forms/FormFlex";
import {useDispatch, useSelector} from "react-redux";
import {IGeneralStore} from "../../../redux";
import {ObjectSchema} from "yup";
import useExecutor from "../../../hooks/useExecutor";
import {AssertsShape, ObjectShape, TypeOfShape} from "yup/lib/object";
import {AnyObject} from "yup/lib/types";

interface OwnProps {
    open: boolean
    keyStore: keyof IGeneralStore
    accessKey: string
    actionToSet: any
    actionToUpdate: any
    actionToAdd: any
    values: any
    setOpen: any
    schemaForValidation: ObjectSchema<ObjectShape, AnyObject, TypeOfShape<ObjectShape>, AssertsShape<ObjectShape>>
}

type Props = OwnProps;


const FormGeneral: FunctionComponent<Props> = ({open, setOpen, keyStore, actionToSet, values, actionToUpdate, actionToAdd, schemaForValidation, accessKey}) => {
    const dispatch = useDispatch()
    // @ts-ignore
    const selected = useSelector((store: IGeneralStore) => store[keyStore].selected)
    const loading = useSelector((store: IGeneralStore) => store[keyStore].loading)
    const executor = useExecutor({keyAccess: accessKey, type: "inputs"})
    const handleSubmit = (values: any) => {
        const {id} = selected
        if (id) {
            dispatch(actionToUpdate({...values, id}))
        } else {
            dispatch(actionToAdd(values))
        }
    }
    const handleCancel = () => {
        setOpen(false)
        dispatch({type: actionToSet, payload: null})
    }
    useEffect(() => {
        if (!loading) setOpen(false)
    }, [loading])


    return (
        <Modal open={open} hasButtons={false} loading={loading} title={selected.id ? 'Update' : 'Add'}>
            <FormFlex inputs={executor(handleCancel, loading) ?? []} schema={schemaForValidation} handleSubmit={handleSubmit} initialValues={values}/>
        </Modal>
    );
};

export default FormGeneral;

