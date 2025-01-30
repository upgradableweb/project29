import React, { useEffect, useState } from 'react'
import StuTabs from './StuTabs'
import TablePaginated from '../../../components/TablePaginated'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Attendance } from '../../../v2/api'
import usePaginate from '../../../components/usePaginate'
import { useParams } from 'react-router-dom'
import { StudentAttendance } from '../../student/ViewStdAttendance'



const columns = [
  { id: 'subject', label: 'Subject', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'session', label: 'Session', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
]

export default function StudentMarks() {

  const { user_id } = useParams()

  return (
    <div>
      <StuTabs />
      <StudentAttendance user={user_id} />
    </div>
  )
}
