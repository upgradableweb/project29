import { Link, useNavigate } from "react-router-dom";
import {
    Paper,
    Box,
    Button,
    Checkbox,
    Stack,
    Typography,
} from '@mui/material';
import usePaginate from "../../components/usePaginate";
import TablePaginated from "../../components/TablePaginated";
import Teacher from "../../v2/api/Teacher";
import useTeacher from "./userData";



const columns = [
    { id: 'subject_code', label: 'Subject Code', minWidth: 170 },
    { id: 'subject_name', label: 'Subject Name', minWidth: 170 },
    { id: 'branch', label: 'Branch', minWidth: 170 },
    { id: 'semister', label: 'Semister', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
]


const ShowSubjects = () => {

    const { _id } = useTeacher()
    const getData = (body) => Teacher.Subject.getMany({ body: { teacher: _id, ...body } })
    const { data, setData, isEmpty, message, ...pagination } = usePaginate(getData)
    const navigate = useNavigate()

    const rows = data.map(d => {

        const onClick = ()=> {
            localStorage.setItem("teacher_attendance_subject", JSON.stringify(d))
            navigate('/Teacher/attendance/' + d._id)
        }
        const semister = d.semister.name
        const branch = d.branch.branch_name
        const action = <Button onClick={onClick} variant='outlined' color='error'>Take Attendance</Button>
        return { ...d, action, semister, branch }
    })

    return (
        <Paper sx={{ p: 4, m: 4 }}>
            <br />
            <Typography>Take Students Attendance</Typography>
            <br />
            <br />
            <TablePaginated pagination={pagination} rows={rows} columns={columns} >
                {isEmpty && <Stack alignItems={'center'} py={4} gap={4}>
                    <Typography textAlign={"center"}>No Data Found</Typography>
                </Stack>}
            </TablePaginated>
        </Paper>
    );
};

export default ShowSubjects;