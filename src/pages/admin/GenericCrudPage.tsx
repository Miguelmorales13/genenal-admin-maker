import React, {FunctionComponent, useEffect, useState} from 'react';
import {Box, Card, Grid, IconButton, Typography, useTheme} from "@mui/material";
import {Add, Create, Delete} from "@mui/icons-material";
import TableResponsive from "../../components/tables/TableResponsive";
import {IButtonTable} from "../../models/IButtonTable";
import {useDispatch, useSelector} from "react-redux";
import {IGeneralStore} from "../../redux";
import {EnumUserRedux} from "../../redux/user";
import useExecutor from "../../hooks/useExecutor";
import DeleteGeneral from "../../components/admin/general/DeleteGeneral";
import FormGeneral from "../../components/admin/general/FormGeneral";
import ObjectSchema, {AssertsShape, ObjectShape, TypeOfShape} from "yup/lib/object";
import {AnyObject} from "yup/lib/types";

interface OwnProps {
    KEY_STORE: keyof IGeneralStore
    ACCESS_KEY: string
    NAME_PAGE: string
    initialValues: any
    actions: any
    schemaForValidation: ObjectSchema<ObjectShape, AnyObject, TypeOfShape<ObjectShape>, AssertsShape<ObjectShape>>
}

type Props = OwnProps;

const GenericCrudPage: FunctionComponent<Props> = ({KEY_STORE, ACCESS_KEY, NAME_PAGE, initialValues, schemaForValidation, actions}) => {

    let theme = useTheme();
    const [openForm, setOpenForm] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const dispatch = useDispatch()
    const loading = useSelector((store: IGeneralStore) => store[KEY_STORE].loading)
    // @ts-ignore
    const items = useSelector((store: IGeneralStore) => store[KEY_STORE][ACCESS_KEY])
    const executor = useExecutor({keyAccess: ACCESS_KEY, type: "headers"})
    const filters = useExecutor({keyAccess: ACCESS_KEY})
    const itemStructure = useExecutor({keyAccess: ACCESS_KEY, type: "itemStructure"})
    const onEdit = (item: any) => {
        dispatch({type: EnumUserRedux.Set, payload: item})
        setOpenForm(true)
    }
    const onDelete = (item: any) => {
        dispatch({type: EnumUserRedux.Set, payload: item})
        setOpenDelete(true)
    }
    const buttons: IButtonTable[] = [
        {
            component: IconButton,
            props: {disabled: loading, size: "small", color: "primary", children: <Delete/>},
            handler: onDelete
        }, {
            component: IconButton,
            props: {disabled: loading, size: "small", color: "primary", children: <Create/>},
            handler: onEdit
        },]
    useEffect(() => {
        dispatch(actions.getAll())
    }, [NAME_PAGE])

    return (
        <>
            <DeleteGeneral open={openDelete} setOpen={setOpenDelete} headers={itemStructure}
                           actionToDelete={actions.delete}
                           actionToSet={EnumUserRedux.Set}
                           keyStore={KEY_STORE}/>
            <FormGeneral
                open={openForm}
                accessKey={ACCESS_KEY}
                setOpen={setOpenForm}
                actionToSet={EnumUserRedux.Set}
                values={initialValues}
                keyStore={KEY_STORE}
                actionToAdd={actions.create}
                actionToUpdate={actions.update}
                schemaForValidation={schemaForValidation}
            />
            <Box
                component={Card}
                display={"flex"}
                justifyContent={"space-between"}
                p={theme.spacing(1)} m={theme.spacing(1)} mt={theme.spacing(10)} bgcolor={theme.palette.secondary.main}
                color={theme.palette.secondary.contrastText} elevation={0}>
                <Typography variant="h6">{NAME_PAGE}</Typography>

                <IconButton disabled={loading} size="small" onClick={() => setOpenForm(true)} color="inherit"><Add/></IconButton>
            </Box>
            <Grid component={Box} overflow="auto" container>
                <Grid item sm={12}>
                    <TableResponsive headers={executor(buttons)} loading={loading} rows={items} filters={filters}/>
                </Grid>
            </Grid>
        </>
    )
        ;
};

export default GenericCrudPage;
