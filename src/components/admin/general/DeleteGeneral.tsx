import React, {FunctionComponent, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../../Modal";
import Item, {HeaderItem} from "../../Item";
import {IGeneralStore} from "../../../redux";

interface OwnProps {
    open: boolean
    keyStore: keyof IGeneralStore
    actionToDelete: any
    actionToSet: any
    setOpen: Function
    headers: HeaderItem[]
}


type Props = OwnProps;

const DeleteGeneral: FunctionComponent<Props> = ({open, setOpen, headers, keyStore, actionToDelete, actionToSet}) => {
    const selectedUser = useSelector((store: any) => store[keyStore].selected)
    const loading = useSelector((store: any) => store[keyStore].loading)
    const dispatch = useDispatch()
    const handleCancel = () => {
        dispatch({type: actionToSet, payload: null})
        setOpen(false)
    }
    const handleConfirm = () => {
        dispatch(actionToDelete(selectedUser.id))
    }
    useEffect(() => {
        if (!loading) setOpen(false)
    }, [loading])
    return (
        <Modal title="Delete" loading={loading} open={open} hasButtons={true} handleDone={handleConfirm}
               handleClose={handleCancel}>
            <Item object={selectedUser} headers={headers}/>
        </Modal>
    );
};

export default DeleteGeneral;
