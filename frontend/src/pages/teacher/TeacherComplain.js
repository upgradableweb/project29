import { Paper } from '@mui/material'
import React from 'react'
import TablePaginated from '../../components/TablePaginated'
import usePaginate from '../../components/usePaginate'
import Teacher from '../../v2/api/Teacher'


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'from', label: 'Role', minWidth: 170 },
  { id: 'desp', label: 'Despcription', minWidth: 170 },
  { id: 'createdAt', label: 'Time', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
]


const TeacherComplain = () => {

  const getData = body => Teacher.Complain.getMany({ body })
  const { data, isEmpty,  ...pagination } = usePaginate(getData)

  const rows = data.map(d => {
    return { ...d }
  })


  return (
    <div>
      <Paper>
        <TablePaginated columns={columns} rows={rows} pagination={pagination} />
      </Paper>
    </div>
  )
}

export default TeacherComplain