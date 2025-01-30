import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Teacher from '../../v2/api/Teacher'
import { Paper, Typography } from '@mui/material'
import moment from 'moment'
import TablePaginated from '../../components/TablePaginated'
import usePaginate from '../../components/usePaginate'





const columns = [
    { id: "usn", label: "USN" },
    { id: "name", label: "Student Name" },
    { id: "attendance", label: "Attendance" },
]

const StudentTable = ({ session, date, semester, branch }) => {

    const { id } = useParams()
    const getData = page => Teacher.Attendance.getMany({ subject: id, semister: semester, branch, session, date, ...page })
    const { data, setData, isEmpty, message, setPagination, ...pagination } = usePaginate(getData)


    useEffect(() => {
        setPagination(prev => ({ ...prev, fetchId: Date.now() }))
    }, [date, session])


    const onChange = async (e) => {

        e.target.disabled = true
        const { name, value, id: user } = e.target

        try {
            const aid = name || "new"

            if (!value) {
                const val = await Teacher.Attendance.deleteById({ id: aid })
                const f = data.map(d => {
                    if (d._id == val.user) {
                        return { ...d, attendance: null }
                    }
                    return d
                })
                setData([...f])
            } else {
                const payload = { session, date, subject: id, status: value, user }
                const val = await Teacher.Attendance.putById({ id: aid, payload })
                const f = data.map(d => {
                    if (d._id == val.user) {
                        return { ...d, attendance: val }
                    }
                    return d
                })
                setData([...f])
            }
        } catch (error) {
            alert(error.message)
        } finally {
            e.target.disabled = false
        }

    }

    const rows = data.map(d => {
        const sts = d.attendance?.status
        const attendance = <select  style={{ background: sts == "present" ? "green" : sts && "red" }} id={d._id} value={sts || ''} name={d.attendance?._id} onChange={onChange}>
            <option value={''}>-------</option>
            <option value={"present"}>Present</option>
            <option value={"absent"}>Absent</option>
        </select>

        return {
            ...d,
            attendance
        }
    })

    return <Paper sx={{ p: 4, m: 2 }}>
        <Typography variant='h6'>Students</Typography>
        <TablePaginated columns={columns} rows={rows} pagination={pagination} />
    </Paper>
}


const now = moment();
const today = now.format("YYYY-MM-DD")
const sessions = [
    "9:30 AM",
    "10:30 AM",
    "11:30 AM",
    "12:30 PM",
    "1:30 PM",
    "2 PM",
    "3 PM",
    "4 PM",
];
const closestSession = sessions.find(session =>
    moment(session, ["h:mm A", "h A"]).isSameOrBefore(now)
) || sessions[0];




export default function TakeAttendance() {


    const [payload, setPayload] = useState({
        session: closestSession,
        date: today
    })

    const onChange = e => {
        let { name, value } = e.target
        setPayload({ ...payload, [name]: value })
    }

    let data = JSON.parse(localStorage.getItem("teacher_attendance_subject"))

    const { subject_name, subject_code, semister, branch } = data || {}
    const { branch_code, branch_name } = branch || {}


    return (
        <div>
            <Paper sx={{ p: 4, m: 2 }}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <td>Subject Name</td>
                            <td>{subject_name}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td><input name='date' value={payload.date} type='date' onChange={onChange} /></td>
                        </tr>
                        <tr>
                            <td>Session</td>
                            <td>
                                <select name='session' onChange={onChange} value={payload.session}>
                                    {sessions.map(session => (
                                        <option key={session} value={session}>
                                            {session}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Paper>
            <StudentTable {...payload} branch={branch?._id} semester={semister?._id} />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}
