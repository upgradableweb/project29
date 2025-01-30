import { Snackbar, Alert as MuiAlert } from '@mui/material'
import React, { useState } from 'react'

export default function useToast() {

    const [open, setOpen] = useState({ message: "", error: false })
    const { error, message } = open
    const onClose = () => setOpen({ message: "", error: false })

    const ToastMessage = (msg, error) => {
        setOpen({ message: msg, error })
    }



    const ToastContainer  = (
        <Snackbar open={Boolean(message)} autoHideDuration={2000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            {
                (open.error === "Done Successfully") ?
                    <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                    :
                    <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
            }
        </Snackbar>
    )

    return { ToastMessage, ToastContainer }
}



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});