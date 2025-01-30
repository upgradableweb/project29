import { Tab, Tabs } from '@mui/material'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function StuTabs() {

    const pathname = window.location.pathname.split('/').pop().toLowerCase()
    const navigate = useNavigate()
    const { user_id } = useParams()

    const onChange = (e, value) => {
        navigate('/Admin/student/' + user_id + '/' + value)
    }

    return (
        <Tabs value={pathname} onChange={onChange} sx={{ bgcolor: 'background.paper' }}>
            <Tab label="Details" value="details" />
            <Tab label="Attendance" value="attendance" />
            <Tab label="Marks" value="marks" />
            {/* <Tab label="Complaints" value="complaints" /> */}
        </Tabs>
    )
}
