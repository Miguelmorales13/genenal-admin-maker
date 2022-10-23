import {number, object, string} from 'yup'

export const ValidationsForm = {
    reqWithSizeMinMax: (min: number, max: number) => string().required('Is required').min(min, `Minimum charters ${min}`).max(max, `Maximum charters ${max}`),
    reqWithSizeMin: (size: number) => string().required('Is required').min(size, `Minimum charters ${size}`),
    reqWithSizeMax: (size: number) => string().required('Is required').max(size, `Maximum charters ${size}`),
    reqNumberMinMax: (min: number, max: number) => number().required('Is required').min(min, `Minimum ${min}`).max(max, `Maximum ${max}`),
    reqNumberMin: (size: number) => number().required('Is required').min(size, `Minimum ${size}`),
    reqNumberMax: (size: number) => number().required('Is required').max(size, `Maximum ${size}`),
    withSizeMinMax: (min: number, max: number) => string().min(min, `Minimum charters ${min}`).max(max, `Maximum charters ${max}`),
    withSizeMin: (size: number) => string().min(size, `Minimum charters ${size}`),
    withSizeMax: (size: number) => string().max(size, `Maximum charters ${size}`),
    numberMinMax: (min: number, max: number) => number().min(min, `Minimum ${min}`).max(max, `Maximum ${max}`),
    numberMin: (size: number) => number().min(size, `Minimum ${size}`),
    numberMax: (size: number) => number().max(size, `Maximum ${size}`),
    reqNumber: () => number().required('Is required'),
    reqEmail: () => string().required('Is required').email("This istn't a format valid"),
    reqNoSpaces: () => string().required('Is required').matches(/^[ s]+|[ s]+$/, "Not spaces"),
    noSpaces: () => string().matches(/^[ s]+|[ s]+$/, "Not spaces"),
    email: () => string().email(),
    req: () => string().required('Is required'),
    reqColorHex: () => string().required('Is required').matches(/#([a-fA-F]|[0-9]){3, 6}/, "This is not format hexadecimal"),
    colorHex: () => string().matches(/#([a-fA-F]|[0-9]){3, 6}/, "This is not format hexadecimal"),
};

export const FormValidators: any = {
    users: object().shape({
        name: ValidationsForm.reqWithSizeMinMax(3, 30),
        lastName: ValidationsForm.reqWithSizeMinMax(3, 30),
        email: ValidationsForm.reqEmail(),
        secondLastName: ValidationsForm.reqWithSizeMinMax(3, 30)
    }),
    roles: object().shape({
        name: ValidationsForm.reqWithSizeMinMax(3, 30),
    }),
}
