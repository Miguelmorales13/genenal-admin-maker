import React, {FunctionComponent, useEffect} from 'react';
import {FormikHelpers, useFormik} from "formik";
import FormInput from "./FormInput";
import {Box, Grid} from "@mui/material";


interface OwnProps {
    schema: any
    initialValues: any
    inputs: any[]
    handleSubmit: (value: any, formikHelpers: FormikHelpers<any>) => (void | Promise<any>)
}

type Props = OwnProps;


const FormFlex: FunctionComponent<Props> = ({schema, initialValues, inputs, handleSubmit}) => {
    const formik = useFormik({
        initialValues,
        validationSchema: schema,
        validateOnBlur: false,
        onSubmit: (value: any, formikHelpers: FormikHelpers<any>) => {
            handleSubmit(value, formikHelpers)
            formik.resetForm()
        }
    })

    useEffect(() => {
        formik.setValues(initialValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues])
    let propsInput = {
        setFieldValue: formik.setFieldValue,
        getFieldProps: formik.getFieldProps,
        handleChange: formik.handleChange,
    }
    return (
        <Grid container component="form" style={{height: '100%', width: '100%',}} onReset={formik.handleReset}
              onSubmit={formik.handleSubmit}>
            {
                inputs.map((props, i) => (
                    <Grid item key={i} component={Box} p={0.5} {...props.configField}>
                        <FormInput value={formik.values[props.name]} errors={formik.errors[props.name]}
                                   touched={formik.touched[props.name]} {...props} {...propsInput}/>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default FormFlex;
