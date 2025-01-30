import React from 'react'
import usePaginate from '../../components/usePaginate'
import Student from '../../v2/api/Student'
import TablePaginated from '../../components/TablePaginated'
import { Box, Paper, Typography } from '@mui/material'
import useStudent from './useStudent'


const columns = [
    { id: 'subject_name', label: 'Subject Name', minWidth: 170 },
    { id: 'subject_code', label: 'Subject Code', minWidth: 170 },
    { id: 'teacher', label: 'Teacher', minWidth: 170 },
    { id: 'teacher_email', label: 'Teacher Email', minWidth: 170 },
]


export default function StudentSubjects() {

    const getData = page => Student.Subject.getMany({ ...page })
    const { data, setData, isEmpty, message, setPagination, ...pagination } = usePaginate(getData)

    const { semister, branch } = useStudent()


    const rows = data.map(d => {
        const teacher = d.teacher.name
        const teacher_email = d.teacher.email
        return { ...d, teacher, teacher_email }
    })

    return (
        <Box>
            <Paper sx={{ p: 4, m: 2 }}>
                <Typography variant='h6'>Branch : {branch?.branch_name}</Typography>
                <Typography variant='h6'>Semister : {semister?.name}</Typography>
            </Paper>

            <Paper sx={{ p: 4, m: 2 }}>
                <Typography variant='h5'>Current Subject</Typography>
                <br />
                <TablePaginated columns={columns} rows={rows} pagination={pagination} />
            </Paper>
        </Box>
    )
}
