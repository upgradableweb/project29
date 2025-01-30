import React from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material';
import useStudent from './useStudent';


const LabelValue = ({ label, children }) => {
  return <Stack direction={"row"}>
    <Typography minWidth={200} fontWeight={600}>{label}</Typography>
    <Typography textTransform={"uppercase"}>: {children}</Typography>
  </Stack>
}


const Profile = () => {

  const data = useStudent()

  const { name, email, branch, semister, usn } = data


  return (
    <Stack alignItems={"center"}>
      <Paper sx={{ p: 4, m: 2, maxWidth: 600, width: "100%" }}>
        <Stack gap={2}>
          <LabelValue label={"University Seat Number"}>{usn}</LabelValue>
          <LabelValue label={"Name"}>{name}</LabelValue>
          <LabelValue label={"Email"}>{email}</LabelValue>
          <LabelValue label={"Branch"}>{branch?.branch_name}</LabelValue>
          <LabelValue label={"Current Semester"}>{semister?.name}</LabelValue>

          <a href={'/reset-password'}>
            <Button>Reset Password</Button>
          </a>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default Profile
