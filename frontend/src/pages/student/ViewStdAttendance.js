import React, { useEffect, useState } from 'react'
import usePaginate from '../../components/usePaginate'
import TablePaginated from '../../components/TablePaginated'
import { Box, Paper, Stack, Typography } from '@mui/material'
import Toast from '../../components/Toast'
import { Attendance } from '../../v2/api'
import useLocalStorage from '../../components/useLocalStorage'


export default function StuSubjectsList() {
    const { _id: user } = useLocalStorage("user")
    return <StudentAttendance user={user} />
}

const columns = [
    { id: 'subject_code', label: 'Subject Code', minWidth: 170 },
    { id: 'subject_name', label: 'Subject Name', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'session', label: 'Session', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 }
]


export function StudentAttendance({ user }) {

    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(true)
    const getData = page => Attendance.getMany({ body: { user, ...page } })
    const { data, setData, isEmpty, ...pagination } = usePaginate(getData)

    const getStats = async () => {
        try {
            const res = await Attendance.getMany({ body: { user, stats: true } })
            setStats(res)
        } catch (error) {
            Toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStats()
    }, [])


    const rows = data.map(d => {
        let { status, subject } = d
        const subject_name = subject.subject_name
        const subject_code = subject.subject_code

        status = <span style={{ textTransform: "capitalize", color: status == "present" ? "green" : "red" }}>{status}</span>

        return {
            ...d,
            subject_name,
            subject_code,
            status
        }
    })

    return (
        <Box>
            <Paper sx={{ p: 4, m: 2 }}>
                <Typography variant='h5'>Attendance Statistics</Typography>
                <br />
                <Stack direction={"row"} flexWrap={"wrap"} gap={4}>
                    {stats.length ?
                        stats.map(({ present, absent, subject }) => {
                            return <Paper elevation={3} sx={{ p: 4 }}>
                                <Typography variant='h6' color={"primary"}>{subject?.subject_name}</Typography>
                                <br />
                                <Typography>Subject Code : {subject?.subject_code}</Typography>
                                <Typography variant='h6' color={"green"}>Present : {present}</Typography>
                                <Typography variant='h6' color={"error"}>Absent : {absent}</Typography>
                            </Paper>
                        })
                        : <Typography>{loading ? "Loading..." : "No Data Found"}</Typography>}
                </Stack>
            </Paper>
            <Paper sx={{ p: 4, m: 2 }}>
                <Typography variant='h5'>Attendance</Typography>
                <br />
                <TablePaginated columns={columns} rows={rows} pagination={pagination}>
                    {isEmpty && <Typography textAlign={"center"} variant='h6' my={4}>No data found</Typography>}
                </TablePaginated>
            </Paper>
        </Box>
    )
}
