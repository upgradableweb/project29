import { Box, Paper, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StuTabs from './StuTabs'
import { Branch, Student } from '../../../v2/api'
import { useParams } from 'react-router-dom'
import MarksTable from '../../../components/MarksTable'
import { StudentDash } from '../../student/StudentHomePage'


const SemisterChange = ({ semister, sems, onChange }) => {

    const [active, setActive] = useState(false)
    const { user_id: id } = useParams()

    const onSemister = async e => {
        const value = e.target.value
        const payload = { semister: value }
        try {
            let res = await Student.putById({ id, payload })
            onChange({ name: "semister", value })
            setActive(false)
        } catch (error) {
            alert(error.message)
        }

    }

    return <Stack direction={'row'} gap={4}>
        <select onChange={onSemister} disabled={!active} value={semister}>
            {sems.map(d => <option value={d._id}>{d.name}</option>)}
        </select>
        <a onClick={() => setActive(!active)} style={{ cursor: "pointer" }} className='a'>{active ? "Cancel" : "Change"}</a>
    </Stack>
}

const columns = [
    {
        label: "Field Name",
        id: "name"
    },
    {
        label: "Field Value",
        id: "value"
    }
]
const showFields = [
    { label: "Name", key: "name" },
    { label: "USN", key: "usn" },
    { label: "Email", key: "email" },
    { label: "Mobile", key: "mobile" },
    { label: "Branch", key: "branch" },
    { label: "Current Semester", key: "semister" }
]


const UpdateSem = () => {

    const [data, setData] = useState({})
    const [sems, setSems] = useState({ semisters: [] })
    const { user_id } = useParams()

    const getSem = async () => {

        try {
            const res = await Student.getById({ id: user_id })
            setData(res)
            const res2 = await Branch.getByIdWithSemisters({ id: res.branch })
            setSems(res2)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getSem()
    }, [])

    const onChange = ({ name, value }) => {
        setData({ ...data, [name]: value })
    }

    const { semister } = data || {}

    const rows = showFields.map(d => {
        let name = d.label
        let value = data[d.key]
        if (d.key == "semister") {
            value = <SemisterChange semister={semister} sems={sems.semisters} onChange={onChange} />
        } else if (d.key == "branch") {
            value = sems.branch_name
        }
        return { name, value }
    })

    return <Box>
        <Paper sx={{ p: 4, m: 4 }}>
            <MarksTable columns={columns} rows={rows} />
        </Paper>
        <Box sx={{ m: 4 }}>
            <StudentDash student={user_id} />
        </Box>
    </Box>
}


export default function ViewStudent() {
    return (
        <div>
            <StuTabs />
            <UpdateSem />
        </div>
    )
}
