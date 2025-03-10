import {
    Paper, Box,
    Stack,
    Typography,
    Button,
    IconButton,
    Switch,
} from '@mui/material';
import { GreenButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { DeleteForever, DriveFileMove, Edit, FilterAltOff, Visibility } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import TablePaginated from '../../../components/TablePaginated';
import usePaginate from '../../../components/usePaginate';
import { Teacher } from '../../../v2/api';
import getQuery from '../../../components/getQuery';
import { useState } from 'react';


const ChangeStatus = ({ status, id, onChange }) => {

    const [loading, setLoading] = useState(false)


    const handleChange = async (e) => {
        try {
            if (!window.confirm("Confirm status change")) return
            const checked = e.target.checked
            setLoading(true)
            const payload = { status: checked }
            await Teacher.putById({ id, payload })
            onChange({ id, status: checked })
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }


    return <Switch onChange={handleChange} disabled={loading} color='success' checked={Boolean(status)} />
}

const columns = [
    { id: 'name', label: 'Teacher Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'branch', label: 'Branch', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
]


const ShowTeachers = () => {

    const getData = (body) => Teacher.getMany({ body: { ...body, ...getQuery() } })
    const { data, isEmpty,setData, message, ...pagination } = usePaginate(getData)
    const navigate = useNavigate()


    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teacher/new")
        },
        {
            icon: <FilterAltOff color="success" />,
            name: 'Reset All Filters',
            action: () => {
                window.location.replace(window.location.pathname)
            }
        },
    ];

    const onChange = ({ id, status })=>{
        const f = data.map(d=>{
            if(d._id == id){
                d.status = status
            }
            return d
        })
        setData(f)
    }


    const rows = data.map(d => {

        const branch = d.branch ? <a className='a' href={'?branch=' + d.branch._id}>{d.branch.branch_code}</a> : '-'
        const action = <Stack direction={"row"} gap={2}>
            <Link to={'/Admin/teacher/' + d._id}><Button variant='outlined' color='error'><Edit />Edit</Button></Link>
            <Link to={`/Admin/teacher/${d._id}/view`}><IconButton><Visibility /></IconButton></Link>
        </Stack>
        const status = <ChangeStatus onChange={onChange} status={d.status} id={d._id} />
        return { ...d, status, action, branch }
    })

    return (
        <Paper sx={{ m: 2, px: 4 }}>
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
                        <Button color='success' variant='contained' onClick={() => navigate('/Admin/student/new')}>Add Student</Button>}
                </Stack>
                : <TablePaginated columns={columns} rows={rows} pagination={pagination} />}
        </Paper>
    );
};

export default ShowTeachers