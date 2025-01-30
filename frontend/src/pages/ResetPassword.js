import { Button, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import useForm from '../components/useForm'
import Toast from '../components/Toast'
import FetchIt from '../v2/api/FetchIt'
import userData from './teacher/userData'

const schema = [
  {
    label: "New Password",
    name: "password",
    placeholder: "Enter new password",
    error: { minlength: 4 }
  },
  {
    label: "Comfirm Password",
    name: "comfirm_password",
    placeholder: "Comfirm new password",
    error: { minlength: 4 }
  }
]


export default function ResetPassword() {

  const { data, isError, setTouchId, inputProps } = useForm(schema)

  const rdRef = useRef(null)


  const onSubmit = async () => {
    const { password, comfirm_password } = data

    if (isError()) {
      setTouchId(2)
      return
    }

    if (password != comfirm_password) {
      Toast.error("password & comfirm must be same")
      return
    }
    try {
      const reset_pass = new FetchIt('/v2/reset-password')
      const user = userData()
      await reset_pass.post({ body: { password, user: user._id } })
      rdRef.current.click()
    } catch (error) {
      Toast.error(error.message)
    }

  }




  return (
    <Stack alignItems={"center"}>
      <br />
      <br />
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Stack gap={4}>
          <Typography textAlign={"center"}>Reset Password</Typography>
          {schema.map(d => <Input autoComplete="off" key={d.name} {...inputProps(d)} />)}
          <Button onClick={onSubmit} variant='outlined'>Submit</Button>
          <Divider>Or</Divider>
          <Stack alignItems={"center"}>
            <a href={'/'} ref={rdRef}>
              <Button>Skip for now</Button>
            </a>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}
