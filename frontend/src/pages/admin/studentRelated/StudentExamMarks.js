import React, { useEffect, useRef, useState } from 'react'
import StuTabs from './StuTabs'
import TablePaginated from '../../../components/TablePaginated'
import { Box, Button, Checkbox, FormControlLabel, IconButton, Paper, Stack, Typography } from '@mui/material'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'
import { Student, Subject } from '../../../v2/api'
import { useParams } from 'react-router-dom'
import useForm from '../../../components/useForm'
import { Add, Delete, Edit } from '@mui/icons-material'

const schema = [
  {
    label: "Internal Marks (1)",
    type: "number",
    name: "internal",
    autoComplete: "off",
    pplaceHolder: "number",
    error: { required: true }
  },
  {
    label: "External Marks (2)",
    type: "number",
    name: "external",
    autoComplete: "off",
    error: { required: true }

  }
]

const total = {
  label: "Total Marks (1+2)",
  name: "total",
  readOnly: true
}

const AddMarksModal = ({ payload, onAction }) => {

  const { data, inputProps, isError, setTouchId, values } = useForm(schema, payload)
  const totalValue = parseInt(values.internal) + parseInt(values.external)
  const { user_id } = useParams()
  const id = payload?._id
  const onClose = () => {
    onAction()
  }


  const onSubmit = async () => {
    try {
      if (isError()) {
        setTouchId(2)
        return
      }
      const { subject, semister } = payload
      const newPayload = { ...data, user: user_id, semister, subject }
      let res = await Student.marks.putById({ payload: newPayload, id })
      onAction(res)
    } catch (error) {
      alert(error.message)
    }
  }


  return <Modal open={payload} onClose={onClose}>
    <Box px={2} overflow={'auto'} maxHeight={"60vh"}>
      <Typography variant='h6'>{payload?.subject_name}</Typography>
      <br />
      <Stack gap={1}>
        {schema.map(d => <Input {...inputProps(d)} />)}
        <Input {...total} value={totalValue} readOnly />
      </Stack>
    </Box>
    <Box p={2}>
      <Button onClick={onSubmit} fullWidth variant='contained'>Submit</Button>
    </Box>
  </Modal>

}


const columns = [
  { id: 'subject_code', label: 'Subject Code', minWidth: 70 },
  { id: 'subject_name', label: 'Subject Name', minWidth: 270 },
  { id: 'internal', label: 'Internal Marks', },
  { id: 'external', label: 'External Marks', },
  { id: 'total', label: 'Total', },
  { id: 'result', label: 'Result', },
  { id: 'action', label: 'Action', }
]

export default function StudentMarks() {

  const [payload, setPayload] = useState(null)
  const [data, setData] = useState({})
  const [marks, setMarks] = useState([])
  const [published, setPublished] = useState([])
  const { user_id } = useParams()
  const [ready, setReady] = useState(false)
  const id = payload?._id || "new"

  const onReady = (e) => {
    const { checked } = e.target
    setReady(checked)
  }

  const getData = async () => {
    try {
      const res = await Student.getDetails({ user: user_id })
      setData(res)
      const res2 = await Student.marks.getMany({ user: user_id })
      const { semister, subjects } = res
      let pubs = [], current = []

      res2.forEach(d => {
        if (d.semister._id == semister._id) {
          current.push(...d.marks)
        } else {
          pubs.push(d)
        }
      })
      let marksIt = []
      subjects.map((da, i) => {
        let { subject_name, _id: subject, subject_code } = da
        const { internal = 0, external = 0, _id } = current.find(daa => daa.subject._id == da._id) || {}
        marksIt.push({ subject_name, subject_code, subject, external, internal, _id, id: i + 2 })
      })
      setMarks(marksIt)
      setPublished(pubs)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onPublish = () => {
    Student.marks.patchPublish({ user: user_id })
      .then(res => {
        setReady("done")
      })
      .catch(err => {
        alert(err.message)
      })
  }

  const onDelete = () => {

    if (!window.confirm("Confirm Delete")) return
    const body = { user: user_id, semester: data.semister._id }
    Student.marks.delete({ body })
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        alert(err.message)
      })
  }

  const onAction = (res) => {
    if (res) {
      let f = marks.map(d => {
        if (d.id == payload.id) {
          const { internal, external } = res
          return { ...d, external, internal }
        }
        return d
      })
      setMarks([...f])
    }
    setPayload(null)
  }


  const { semister } = data
  const rows = marks.map(d => {
    let { internal, external } = d
    internal = parseInt(internal)
    external = parseInt(external)

    let result = (external < 18 || internal < 18) ? "F" : "P"
    let total = internal + external
    let action = <IconButton onClick={() => setPayload({ ...d, semister })}>{d.internal ? <Edit /> : <Add />}</IconButton>

    return { ...d, result, total, action }
  })


  return (
    <div>
      <StuTabs />
      <AddMarksModal id={id} payload={payload} onAction={onAction} />
      <Paper sx={{ p: 4, m: 2 }}>
        <Stack direction={'row'} justifyContent={"space-between"} >
          <Typography display={"flex"} gap={2}>{semister?.name} - <Typography color={"primary"}>Current</Typography></Typography>
          {ready == "done" ?
            <Button color='success'>Published</Button>
            : <Stack direction={"row"}>
              <FormControlLabel onChange={onReady} control={<Checkbox />} label="Ready To Publish" />
              <Button disabled={!ready} onClick={onPublish} variant='contained' color='success'>Publish</Button>
              <IconButton onClick={onDelete} disabled={ready} color='error'><Delete /></IconButton>
            </Stack>}
        </Stack>
        <br />
        <TablePaginated columns={columns.slice(0, ready == "done" ? -1 : columns.length)} rows={rows} />
      </Paper>
      {published.map(d => {
        let { marks } = d
        marks = marks.map(d => {
          let subject_name = d.subject.subject_name
          let { internal, external } = d
          let total = parseInt(internal) + parseInt(external)
          return { internal, external, subject_name, total }
        })
        return <Paper sx={{ p: 4, m: 2 }}>
          <Stack direction={'row'} justifyContent={"space-between"} >
            <Typography display={"flex"} gap={2}>{d.semister?.name}</Typography>
            <Button color='success'>Published</Button>
          </Stack>
          <br />
          <TablePaginated columns={columns.slice(1, -1)} rows={marks} />
        </Paper>
      })}
    </div>
  )
}
