import { Box, Grid, Input as MuiInput, Typography } from '@mui/material'
import { useId, useState } from 'react'

export default function Input({ label, helperText, error, ...props }) {

    const [blur, setBlur] = useState(false)
    const id = useId()
    const err = Boolean(blur || error) && helperText
    const onBlur = () => blur && setBlur(true)

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <label htmlFor={id} style={{ color: "gray"}} >{label}</label>
            <MuiInput onBlur={onBlur} id={id} error={error} {...props} />
            <Typography pl={1} color={'red'}>{err}</Typography>
        </Box>
    )
}
