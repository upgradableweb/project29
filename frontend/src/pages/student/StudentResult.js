import React, { useEffect, useState } from 'react'
import Student from '../../v2/api/Student'
import Toast from '../../components/Toast'
import { Button, Paper, Stack, Typography } from '@mui/material'
import MarksTable from '../../components/MarksTable'
import parseMarks from '../../components/MarksTable/parseMarks'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../../components/useLocalStorage'


const columns = [
  { id: 'subject_code', label: 'Subject Code', maxWidth: 60 },
  { id: 'subject_name', label: 'Subject Name', minWidth: 170 },
  { id: 'internal', label: 'Internal Marks', maxWidth: 80 },
  { id: 'external', label: 'External Marks', maxWidth: 80 },
  { id: 'total', label: 'Total Marks', maxWidth: 80 },
  { id: 'result', label: 'Result', maxWidth: 80 }
]


export default function StudentResult() {

  const [data, setData] = useState([])
  const { _id: user } = useLocalStorage('user')
  const navigate = useNavigate()

  const getStats = async () => {
    try {
      const res = await Student.Results.getMany()
      setData(res)
    } catch (error) {
      Toast.error(error.message)
    }
  }

  useEffect(() => {
    getStats()
  }, [])

  const onPrint = val => {
    window.open(`/results/print?user=${user}&semester=${val.semister._id}`, '_blank');
  }

  return (
    <Stack padding={4} m={2}>
      {data.map(d => {
        let { marks } = d
        return <Paper sx={{ p: 4, m: 2 }}>
          <Stack direction={'row'} justifyContent={"space-between"} >
            <Typography display={"flex"} gap={2}>{d.semister?.name}</Typography>
            <Button color='success' onClick={() => onPrint(d)}>Print</Button>
          </Stack>
          <br />
          <MarksTable columns={columns} rows={parseMarks(marks)} />
        </Paper>
      })}
    </Stack>
  )
}
