import React, {FunctionComponent} from 'react';
import FormFlex from "../components/forms/FormFlex";
import {ISignIn} from "../models/ISignIn";
import {inputsSignIn} from "../data-modeler";
import {NavLink} from "react-router-dom";
import {object} from "yup";
import {ValidationsForm} from "../utils";
import {Avatar, Box, Card, CssBaseline, Grid, Link, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Copyright, LockOutlined} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {AuthActionSignIn} from "../redux/auth";
import {IGeneralStore} from "../redux";


let AvatarStyled = styled(Avatar)(({theme}) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}));

interface OwnProps {
}

type Props = OwnProps;

const schema = object().shape({
    user: ValidationsForm.reqWithSizeMinMax(3, 50),
    password: ValidationsForm.reqWithSizeMinMax(3, 30)
})
const SignInPage: FunctionComponent<Props> = (props) => {
    const theme = useTheme()
    const isSm = useMediaQuery(theme.breakpoints.down("sm"))
    const loading = useSelector((store: IGeneralStore) => store.auth.loading)
    let dispatch = useDispatch();

    const initialValues: ISignIn = {
        user: '',
        password: ''
    }
    const handleSubmit = (values: ISignIn) => {
        // @ts-ignore
        dispatch(AuthActionSignIn(values))

    }
    return (
        <Box component="main" bgcolor={`linear-gradient(to left top,  ${theme.palette.primary.main}, ${theme.palette.background.default});`}>
            <CssBaseline/>
            <Box minHeight={"100vh"} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} display={'flex'}>
                <Card elevation={10}>
                    <Grid container>
                        {!isSm && <Grid item xs={6} bgcolor={theme.palette.primary.main} p={theme.spacing(1)} color={theme.palette.primary.contrastText}>
                            <img src="e-commerce.png" alt="icon"/>
                            <Typography variant="h4">
                                e-commerse
                            </Typography>
                            <Typography variant="h5">🤑💲 </Typography>
                        </Grid>}
                        <Grid item xs={12} md={6}>
                            <Box justifyContent={'center'} flexDirection={'column'} alignItems={'center'} display={'flex'}>

                                <AvatarStyled><LockOutlined/></AvatarStyled>
                                <Typography component="h1" variant="h5">Sign in</Typography>
                            </Box>
                            <Box mt={theme.spacing(1)} p={theme.spacing(1)} width={"100%"}>
                                <FormFlex inputs={inputsSignIn(loading)} handleSubmit={handleSubmit} initialValues={initialValues} schema={schema}/>
                                <Grid container>
                                    <Grid item xs>
                                        <Link component={NavLink} to="/forgot-password" variant="body2">Did you forget your password ?</Link>
                                    </Grid>
                                    <Grid item>
                                        <Link component={NavLink} to="/sign-up" variant="body2">You dont have account ?</Link>
                                    </Grid>
                                    <Grid item display={"flex"} justifyContent={"center"} width={"100%"} pt={theme.spacing(3)}>
                                        <Copyright/>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Grid>
                    </Grid>

                </Card>
            </Box>
        </Box>
    );
};

export default SignInPage;



