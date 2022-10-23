import React, {ChangeEvent, FunctionComponent} from 'react';

import {FieldInputProps, FormikErrors, FormikValues} from "formik";
import {Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Grid, styled, Switch, Typography, useTheme} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

interface OwnProps {
    name: string,
    label: string,
    value: []
    handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

type Props = OwnProps;

const CenterTotal = styled("div")(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}))
const FormAccessCards: FunctionComponent<Props> = ({name, label, value, handleChange, getFieldProps, setFieldValue}) => {
    let theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12} p={theme.spacing(0.5)}>
                <Typography>{label} </Typography>
            </Grid>

            {
                value && value.map((module: any, key: number) => (
                    <Grid item key={`module-${key}`} xs={12} md={6} p={theme.spacing(0.5)}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMore/>} arial-controls={`module-${key}`}>
                                <Typography>{module.name}</Typography>
                            </AccordionSummary>
                            <Box component={AccordionDetails} p={theme.spacing(1)}>
                                <Grid container>
                                    {
                                        module && module.accesses && module.accesses.map((access: any, key2: number) => (
                                            <Grid item key={`access-${key}-${key2}`} xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                <CenterTotal>
                                                    <Checkbox checked={access.isDone}
                                                              name={`${name}[${key}].accesses[${key2}].isDone`}
                                                              onChange={(event: any) => {
                                                                  setFieldValue(`${name}[${key}].accesses[${key2}].permission`, !access.isDone)
                                                                  handleChange(event, true)
                                                              }}/>

                                                    <Typography>{access.name}  </Typography>
                                                </CenterTotal>
                                                <CenterTotal>
                                                    <Switch checked={access.permission} disabled={!access.isDone}
                                                            name={`${name}[${key}].accesses[${key2}].permission`}
                                                            onChange={handleChange}/>
                                                    <Typography>Escritura </Typography>
                                                </CenterTotal>
                                            </Grid>

                                        ))
                                    }
                                </Grid>
                            </Box>
                        </Accordion>

                    </Grid>
                ))
            }
        </Grid>
    );
};

export default FormAccessCards;
