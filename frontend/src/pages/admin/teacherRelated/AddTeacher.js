import { useNavigate, useParams } from 'react-router-dom';
import { Button, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import Input from '../../../components/Input';
import useForm from '../../../components/useForm';
import ApiSelect from '../../../v2/ApiSelect';
import { Branch, Teacher } from '../../../v2/api';
import Toast from '../../../components/Toast';
import { useEffect, useState } from 'react';

const schema = [
  {
    name: "name",
    label: "Teacher name",
    placeholder: "Full Name",
    error: { required: true, maxlength: 100 }
  },
  {
    name: "email",
    label: "Teacher email",
    placeholder: "example@email.com",
    error: { required: true, maxlength: 100 }
  },
  {
    name: "password",
    label: "Teacher login password",
    placeholder: "Min 4 Char",
    error: { required: true, maxlength: 100 }
  },
  {
    label: "Branch",
    name: 'branch'
  },
]

const branch = schema.find(d => d.name == "branch")


const AddTeacher = () => {

  const [loading, setLoading] = useState(false)
  const [perv, setPrev] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isError, setTouchId, inputProps } = useForm(schema, perv)

  const getTeacher = async () => {
    try {
      const res = await Teacher.getById({ id })
      setPrev(res)
    } catch (error) {
      Toast.error(error.message)
    }
  }
  useEffect(() => {
    if (id != "new") {
      getTeacher()
    }
  }, [])

  const onSubmit = async (isNew) => {
    if (isError()) {
      setTouchId(2)
      return
    }

    try {
      setLoading(true)
      await Teacher.putById({ id, payload: data })
      if (isNew) {
        window.location.replace("/Admin/teacher/new")
    } else {
        navigate(-1)
    }
    } catch (error) {
      Toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const Options = (da) => {
    return <>
      <option value={''}>None</option>
      {da.map(d => <option value={d._id}>{d.branch_name}</option>)}
    </>
  }


  return (
    <Stack alignItems={'center'}>
      <br />
      <br />
      <Paper sx={{ width: "100%", maxWidth: 600, p: 4 }}>
        {loading && <LinearProgress />}
        <Stack spacing={3}>
          <Typography variant='h5'>Add Teacher</Typography>
          {schema.slice(0, 3).map(d => <Input {...inputProps(d)} />)}
          <ApiSelect
            Options={Options}
            api={Branch.getMany}
            dep={true}
            {...inputProps(branch)}
          />
          <br />
          <Stack flexDirection={"row"} justifyContent={"space-between"} >
            <Button variant='outlined' onClick={() => navigate(-1)}>BACK</Button>
            <Stack direction={"row"} gap={4}>
              <Button variant="contained" onClick={() => onSubmit("new")}>Save & Add New</Button>
              <Button variant="contained" onClick={() => onSubmit()}>SUBMIT</Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <br />
      <br />
    </Stack>
  )
}

export default AddTeacher