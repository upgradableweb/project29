import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound({ setNotFound }) {

    const navigate = useNavigate()

    // useEffect(() => {
    //     setNotFound && setNotFound(true);
    //   }, [setNotFound]);


    return (
        <div>
            <br/>
            <br/>
            <Typography textAlign={"center"} mt={10}>404 | Page Not Found</Typography>
            <br/>
            <Stack alignItems={"center"}>
                <Button color='error' onClick={() => navigate('/')}>Go Home</Button>
            </Stack>
        </div>
    )
}
