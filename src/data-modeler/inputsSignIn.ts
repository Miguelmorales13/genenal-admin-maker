import {EnumInput} from "../models/EnumInput";

export const inputsSignIn: Function = (loading: boolean) => [
    {
        name: 'user',
        label: 'User',
        type: EnumInput.TextField,
        configField: {xs: 12},
        configInput: {}
    }, {
        name: 'password',
        label: 'Password',
        type: EnumInput.TextField,
        configField: {xs: 12},
        configInput: {
            type: 'password'
        }
    }, {
        name: 'button',
        label: 'Login',
        type: EnumInput.ButtonLoading,
        configField: {xs: 12, p: 0.5},
        configInput: {
            loading,
            type: 'submit',
            color: 'primary'
        }
    }
]
