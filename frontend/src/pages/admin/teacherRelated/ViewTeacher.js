import React, { useEffect, useState } from 'react'
import { TeacherData } from '../../teacher/TeacherHomePage'
import { useParams } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import TeacherSubs from '../../teacher/TeacherSubs'
import Toast from '../../../components/Toast'
import { Teacher } from '../../../v2/api'
import { Email } from '@mui/icons-material'

export default function ViewTeacher() {

    const [data, setData] = useState({})
    const { id } = useParams()

    const getTeacher = async () => {
        try {
            const res = await Teacher.getById({ id })
            setData(res)
        } catch (error) {
            Toast.error(error.message)
        }
    }
    useEffect(() => {
        if (id != "new") {
            getTeacher()
        }
    }, [])


    return (
        <div>
            <Box m={4}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant='h4'>{data.name}</Typography>
                    <Button color='inherit'><Email/>{data.email}</Button>
                </Stack>
                <br />
                <TeacherData teacher={id} />
            </Box>
            <TeacherSubs teacher={id} />
        </div>
    )
}
