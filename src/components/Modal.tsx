import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme} from "@mui/material";

interface OwnProps extends PropsWithChildren {
    title: string
    hasButtons?: boolean
    open: boolean
    loading?: boolean
    // setOpen: Function
    handleClose?: (event: object, reason?: string) => void
    handleDone?: (event: object) => void
}

type Props = OwnProps;

const Modal: FunctionComponent<Props> = ({loading = false, open, hasButtons = true, handleDone, title, handleClose, children}) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Dialog
            open={open}
            disableEscapeKeyDown={false}
            keepMounted
            fullWidth={true}
            maxWidth="sm"
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby={`alert-dialog-slide-title-${title}`}
        >
            <DialogTitle id={`alert-dialog-slide-title-${title}`}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            {
                hasButtons && (
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose} color="secondary">Cancel</Button>
                        <Button disabled={loading} onClick={handleDone} color="primary">Confirm</Button>
                    </DialogActions>
                )
            }
        </Dialog>
    );
};

export default Modal;
