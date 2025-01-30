import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import TablePaginated from '../../components/TablePaginated'
import userData from './userData'
import usePaginate from '../../components/usePaginate'
import Teacher from '../../v2/api/Teacher'



const columns = [
    { id: 'subject_code', label: 'Subject Code', minWidth: 170 },
    { id: 'subject_name', label: 'Subject Name', minWidth: 170 },
    { id: 'branch', label: 'Branch', minWidth: 170 },
    { id: 'semister', label: 'Semister', minWidth: 170 },
    { id: 'subject_status', label: 'Status', minWidth: 170 }
]

const { _id } = userData()

export default function TeacherSubs({ teacher = _id }) {

    
    const getData = (body) => Teacher.Subject.getMany({ body: { teacher, ...body } })
    const { data, setData, isEmpty, message, ...pagination } = usePaginate(getData)

    const rows = data.map(d => {
        const semister = d.semister.name
        const branch = d.branch.branch_name
        const subject_status = <span>{d.subject_status ? "Active" : "In-Active"}</span>
        return { ...d, semister, branch, subject_status }
    })


    return (
        <div>
            <Paper sx={{ p: 4, m: 4 }}>
                <br />
                <Typography>Assigned Subjects</Typography>
                <br />
                <TablePaginated pagination={pagination} rows={rows} columns={columns} >
                    {isEmpty && <Stack alignItems={'center'} py={4} gap={4}>
                        <Typography textAlign={"center"}>No Data Found</Typography>
                    </Stack>}
                </TablePaginated>
            </Paper>
        </div>
    )
}
