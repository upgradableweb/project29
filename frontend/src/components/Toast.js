import { Snackbar, Alert as MuiAlert } from '@mui/material'
import React, { useEffect, useState } from 'react'

let toastInput

export function ToastContainer() {
    const [open, setOpen] = useState({ message: "", error:"", isOpen: false })
    const { isOpen, error, message } = open
    const onClose = () => setOpen({ ...open, isOpen: false })

    useEffect(() => {
        toastInput = document.getElementById('toast-input')
        toastInput.onchange = () => {
            const value = toastInput.value
            let [err, msg] = value.split(",")
            err = err == "error"
            setOpen({ error: err, message: msg, isOpen: true })
        }

    }, [])


    return (
        <>
            <input hidden id='toast-input' />
            <Snackbar open={isOpen} autoHideDuration={2000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                {error ?
                    <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                    : <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                        {message}
                    </Alert>}
            </Snackbar>
        </>
    )
}



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Toast = {
    sucess: (message) => {
        toastInput.value = "sucess," + message
        toastInput.dispatchEvent(new Event('change'));
    },
    error: (message) => {
        toastInput.value = "error," + message
        toastInput.dispatchEvent(new Event('change'));
    }
}

export default Toast