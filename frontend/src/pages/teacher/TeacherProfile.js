import React, { useEffect, useState } from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material';
import Teacher from '../../v2/api/Teacher';

const TeacherProfile = () => {

  const [data, setData] = useState({})

  const getData = async () => {
    try {
      let res = await Teacher.getProfile()
      setData(res)
    } catch (error) {
      alert(error.message)
    }
  }


  useEffect(() => {
    getData()
  }, [])

  const { name, email, branch } = data


  return (
    <Stack alignItems={"center"}>
      <Paper sx={{ p: 4, m: 2, maxWidth: 600, width: "100%" }}>
        <Typography variant='h6'>Name : {name}</Typography>
        <br />
        <Typography variant='h6'>Email : {email}</Typography>
        <br />
        <Typography variant='h6'>Branch : {branch?.branch_name}</Typography>
        <br />
        <a href={'/reset-password'}>
          <Button>Reset Password</Button>
        </a>
      </Paper>
    </Stack>
  )
}

export default TeacherProfile
