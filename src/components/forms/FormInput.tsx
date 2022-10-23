import React, {ChangeEvent, FunctionComponent} from 'react';
import {FieldInputProps, FormikErrors, FormikValues} from "formik";
import DropInput from "./DropInput";
import {Button, FormControlLabel, InputBase, MenuItem, Switch, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {EnumInput} from "../../models/EnumInput";
import {IInput} from "../../models/IInput";
import FormAccessCards from "./FormAccessCards";

interface OwnProps extends IInput {
    isMulti: boolean
    errors?: any
    value: any
    touched?: any;
    handleChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    disabled: boolean;
    getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

type Props = OwnProps;

const FormInput: FunctionComponent<Props> = ({isMulti, setFieldValue, getFieldProps, value, type, label, name, configInput, touched, errors, handleChange, options}) => {

    let config = {
        onChange: handleChange,
        name: name,
        ...(typeof configInput == 'function' ? configInput(getFieldProps, setFieldValue) : configInput),
    }
    if (!isMulti) {
        config = {
            ...config,
            error: touched && errors !== undefined,
            value: value
        }

    }
    switch (type) {
        case EnumInput.TextField:
            return (<TextField variant="outlined" margin="dense" fullWidth label={label} helperText={errors} autoComplete={name} {...config}/>)
        case EnumInput.Button:
            return (<Button fullWidth variant="contained"  {...configInput}>{label}</Button>)
        case EnumInput.ButtonLoading:
            return (<LoadingButton loadingPosition="start" fullWidth variant="contained"  {...configInput}>{label}</LoadingButton>)
        case EnumInput.DropInput:
            return (<DropInput src={config.value} setFieldValue={setFieldValue} name={name} label={label}/>)
        case EnumInput.Switch:
            return (<FormControlLabel control={<Switch checked={config.value} onChange={config.onChange} name={name} {...configInput} />} label={label}/>)
        case EnumInput.Select:
            return (
                <TextField variant="outlined" margin="dense" fullWidth label={label} helperText={errors} {...config} select>
                    <MenuItem value={0}><em>None</em></MenuItem>
                    {options && options.map((o, i) => (<MenuItem key={`${name}-key-${i}`} value={o.id}>{o.name}</MenuItem>))}
                </TextField>
            )
        case EnumInput.Accesses:
            return (<FormAccessCards label={label} setFieldValue={setFieldValue} getFieldProps={getFieldProps} name={name} handleChange={handleChange}
                                     value={value}/>)
        default:
            return (
                <InputBase {...configInput}/>
            )
    }
};


export default FormInput;

