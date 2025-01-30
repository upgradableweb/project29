import React, { useEffect, useState } from 'react'
import MarksTable from '../components/MarksTable'
import parseMarks from '../components/MarksTable/parseMarks'
import { useParams } from 'react-router-dom'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Student from '../v2/api/Student'

const columns = [
  { id: 'subject_code', label: 'Subject Code', maxWidth: 60 },
  { id: 'subject_name', label: 'Subject Name', minWidth: 170 },
  { id: 'internal', label: 'Internal Marks', maxWidth: 80 },
  { id: 'external', label: 'External Marks', maxWidth: 80 },
  { id: 'total', label: 'Total Marks', maxWidth: 80 },
  { id: 'result', label: 'Result', maxWidth: 80 }
]

const status = [
  { name: "P", label: "Pass" },
  { name: "F", label: "Fail" },
  { name: "A", label: "Absent" },
  { name: "X", label: "Not Eligible" },
];


export default function PrintResult() {

  const [data, setData] = useState({ marks: [] })

  const params = new URLSearchParams(window.location.search)
  const user = params.get("user")
  const semester = params.get("semester")
  const getData = async () => {
    try {
      const res = await Student.Results.getOne({ params: { semester, user } })
      setData(res)
      setTimeout(() => {
        window.print()
      }, 1000)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const { marks, semister, student } = data


  return (
    <Stack alignItems={"center"}>
      <Box width={"100%"} maxWidth={800}>
        <br />
        <br />
        <Typography fontWeight={600} textAlign={"center"}>Cambridge University</Typography>
        <br />
        <br />
        <Stack direction={"row"}>
          <Typography minWidth={200} fontWeight={600}>University Seat Number </Typography>
          <Typography textTransform={"uppercase"}>: {student?.usn}</Typography>
        </Stack>
        <Stack direction={"row"}>
          <Typography minWidth={200} fontWeight={600}>Student Name</Typography>
          <Typography textTransform={"uppercase"}>: {student?.name}</Typography>
        </Stack>
        <br />
        <br />
        <br />
        <Typography fontWeight={600} textAlign={"center"}>{semister?.name}</Typography>
        <br />
        <MarksTable columns={columns} rows={parseMarks(marks)} />
        <br />
        <br />
        <br />
        <Typography fontWeight={600} textAlign={"center"}>Nomenclature / Abbreviations</Typography>
        <br />
        <Stack direction={"row"}>
          {status.map(d => <Typography border={"1px solid #8886"} textTransform={"uppercase"} px={1} py={0.5} flex={1} width={"100%"}>{d.name} {"-->"} {d.label}</Typography>)}
        </Stack>
      </Box>
    </Stack>
  )
}
