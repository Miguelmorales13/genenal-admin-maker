import React, {FunctionComponent, useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone";

import {readImage} from "../../utils";
import {FormikErrors, FormikValues} from "formik";
import {Card, CardActionArea, CardMedia, Typography, useTheme} from "@mui/material";
import {Publish} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

const DropInputStyled = styled("div")(({theme}) => ({
    width: '100%',
    height: '100%',
    minHeight: theme.spacing(15),
    minWidth: theme.spacing(10),
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

const ContainerText = styled("div")(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2)
}))

const RootPhoto = styled(Card)(({theme}) => ({
    display: "flex",
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}))

interface OwnProps {
    src?: string
    name: string
    label: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

type Props = OwnProps;

const DropInput: FunctionComponent<Props> = ({src, name, label, setFieldValue}) => {
    const [file, setFile] = useState(null)
    const onDrop = useCallback((acceptedFiles: any[]) => {
        setFile(acceptedFiles[0])
        setFieldValue(name, acceptedFiles[0])
    }, [name, setFieldValue])
    // @ts-ignore
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: ['image/png', 'image/jpeg', 'image/gif'], maxFiles: 1, multiple: false})
    const theme = useTheme()
    const noContent = (
        <RootPhoto>
            <CardActionArea>
                <CardMedia style={{minWidth: theme.spacing(15), minHeight: theme.spacing(15)}} image={file ? readImage(file) : src}/>
            </CardActionArea>
        </RootPhoto>
    );

    return <DropInputStyled {...getRootProps()}>
        <input {...getInputProps()} />
        {
            src || file ? noContent : <ContainerText>
                <Publish style={{fontSize: theme.spacing(4)}}/>
                <Typography align="center" variant="h6">
                    {isDragActive ? 'forms.let_it_go' : `Drop down`}
                </Typography>

            </ContainerText>
        }
    </DropInputStyled>;
};

export default DropInput;
