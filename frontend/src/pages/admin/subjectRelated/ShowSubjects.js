import { Link, useNavigate } from "react-router-dom";
import {
    Paper,
    Box,
    Button,
    Checkbox,
    Stack,
    Typography,
    Switch,
} from '@mui/material';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { Add, DriveFileMove, Edit, Filter, FilterAlt, FilterAltOff, Visibility } from '@mui/icons-material';
import { Subject } from '../../../v2/api';
import TablePaginated from '../../../components/TablePaginated';
import usePaginate from '../../../components/usePaginate';
import getQuery from "../../../components/getQuery";


const columns = [
    { id: 'subject_name', label: 'Subject Name', minWidth: 170 },
    { id: 'subject_code', label: 'Subject Code', minWidth: 170 },
    { id: 'teacher', label: 'Teacher', minWidth: 170 },
    { id: 'branch', label: 'Branch', minWidth: 170 },
    { id: 'semister', label: 'Semister', minWidth: 170 },
    { id: 'subject_status', label: 'Status', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
]


const ShowSubjects = () => {


    const getData = (body) => Subject.getMany({ body: { ...body, ...getQuery() } })
    const { data, setData, isEmpty, message, ...pagination } = usePaginate(getData)
    const navigate = useNavigate()


    const actions = [
        {
            icon: <Add color="primary" />,
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/new")
        },
        {
            icon: <FilterAltOff color="success" />,
            name: 'Reset Filters',
            action: () => {
                    window.location.replace(window.location.pathname)
            }
        }
    ];

    const rows = data.map(d => {

        const semister = <a className='a' href={'?semister=' + d.semister._id}>{d.semister.name}</a>
        const branch = <a className='a' href={'?branch=' + d.branch._id}>{d.branch.branch_code}</a>
        const teacher = <a className='a' href={'?teacher=' + d.teacher._id}>{d.teacher.name}</a>
        const action = <Box sx={{ display: "flex", gap: 2 }}>
            <Link to={'/Admin/subjects/' + d._id}><Button variant='outlined' color='error'><Edit />Edit</Button></Link>
        </Box>
        const subject_status = <Switch onChange={()=> navigate('/Admin/subjects/' + d._id)} color="success" checked={Boolean(d.subject_status)} />
        return { ...d, action, subject_status, teacher, branch, semister }
    }) 

    return (
        <Paper sx={{ px: 4, m: 2 }}>
            <SpeedDialTemplate actions={actions} />
            <br />
            {isEmpty ?
                <Stack alignItems={'center'} py={4} gap={4}>
                    {message ?
                        <>
                            <Typography color={'red'}>{message}</Typography>
                            <Button color='success' variant='contained' onClick={() => window.location.reload()}>Retry</Button>
                        </>
                        :
                        <Button color='success' variant='contained' onClick={() => navigate('/Admin/subjects/new')}>Add Subject</Button>}
                </Stack>
                : <TablePaginated pagination={pagination} rows={rows} columns={columns} />}
        </Paper>
    );
};

export default ShowSubjects;