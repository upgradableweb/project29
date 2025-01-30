import React, { useState } from 'react'
import StuTabs from './StuTabs'
import TablePaginated from '../../../components/TablePaginated'
import { Button, Paper, Stack, Typography } from '@mui/material'



const columns = [
  { id: 'subject', label: 'Subject', minWidth: 170 },
  { id: 'createdAt', label: 'Date', minWidth: 170 },
  { id: 'session', label: 'Session', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
]

export default function StudentMarks() {


  return (
    <div>
      <StuTabs />
      <Paper sx={{ p: 4, m: 2 }}>
        <TablePaginated columns={columns} rows={[]} />
      </Paper>
    </div>
  )
}
