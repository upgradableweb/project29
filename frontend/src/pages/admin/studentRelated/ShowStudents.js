import {
    Paper, Box,
    Stack,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    IconButton,
    Popper,
    MenuItem,
    ClickAwayListener,
    Tooltip,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { Edit, FilterAltOff, More, MoreVert, Visibility } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import TablePaginated from '../../../components/TablePaginated';
import usePaginate from '../../../components/usePaginate';
import { Student } from '../../../v2/api';
import {  useState } from 'react';
import getQuery from '../../../components/getQuery';



const MoreActions = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);


    return <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <Box>
            <Tooltip arrow placement='top' title={"More Options"}>
                <IconButton onClick={handleClick}><MoreVert /></IconButton>
            </Tooltip>
            <Popper open={open} anchorEl={anchorEl}>
                <Paper>
                    <Stack gap={1} minWidth={100}>
                        <Link to={`/Admin/student/${id}/details`}><MenuItem>View</MenuItem></Link>
                        <Link to={`/Admin/student/${id}/marks`}><MenuItem>Marks</MenuItem></Link>
                        <Link to={`/Admin/student/${id}/attendance`}><MenuItem>Attendance</MenuItem></Link>
                    </Stack>
                </Paper>
            </Popper>
        </Box>
    </ClickAwayListener>
}

const columns = [
    { id: 'usn', label: 'USN', minWidth: 170 },
    { id: 'name', label: 'Student Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'branch', label: 'Branch', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170 },
]


const ShowStudents = () => {

    const getData = (body) => Student.getMany({ body: { ...body, ...getQuery() } })
    const { data, isEmpty, message, ...pagination } = usePaginate(getData)
    const navigate = useNavigate()


    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />,
            name: 'Add New Student',
            action: () => navigate("/Admin/student/new")
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

        const branch = d.branch ? <a className='a' href={'?branch=' + d.branch._id}>{d.branch.branch_code}</a> : '-'
        const action = <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
            <Link to={'/Admin/student/' + d._id}><Button variant='outlined' color='error' ><Edit /> Edit</Button></Link>
            <Link to={`/Admin/student/${d._id}/details`}><Tooltip arrow placement='top' title={"View " + d.name}><IconButton><Visibility /></IconButton></Tooltip></Link>
            <MoreActions id={d._id} />
        </Stack>
        return { ...d, action, branch }
    })

    return (
        <Paper sx={{ m: 2, px: 4 }}>
            <Stack justifyContent={'space-between'} pt={2} alignItems={"start"} flexDirection={"row"}>
                {/* <AddButtons /> */}<div />
                <SpeedDialTemplate actions={actions} />
            </Stack>
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
                :
                <TablePaginated columns={columns} rows={rows} pagination={pagination} />}
        </Paper>
    );
};

export default ShowStudents