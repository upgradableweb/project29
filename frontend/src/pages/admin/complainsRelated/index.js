import React, { useState } from 'react'
import TablePaginated from '../../../components/TablePaginated'
import { Paper } from '@mui/material'



const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'from', label: 'Role', minWidth: 170 },
    { id: 'desp', label: 'Despcription', minWidth: 170 },
    { id: 'createdAt', label: 'Time', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
]

export default function ComplainsRealted() {

    return (
        <Paper sx={{ p: 4, m: 2 }}>
            <TablePaginated columns={columns} rows={[]} />
        </Paper>
    )
}
