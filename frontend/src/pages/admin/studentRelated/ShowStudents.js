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
import { DriveFileMove, Edit, FilterAltOff, More, MoreVert, Visibility } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import TablePaginated from '../../../components/TablePaginated';
import usePaginate from '../../../components/usePaginate';
import { Branch, Student } from '../../../v2/api';
import DemoData from '../../../v2/DemoData';
import { useEffect, useState } from 'react';
import Modal from '../../../components/Modal';
import ApiSelect from '../../../v2/ApiSelect';
import useForm from '../../../components/useForm';
import getQuery from '../../../components/getQuery';


const sampleSchema = [
    {
        label: "Branch",
        name: 'branch',
        error: { required: true }
    },
    {
        name: 'semister',
        label: "Select semister",
        error: { required: true }
    }]

export const SelectMarkDetails = ({ open, onClose }) => {
    const navigate = useNavigate()
    const { data, isError, setTouchId, setData, inputProps, values } = useForm(sampleSchema)
    const { branch } = values

    useEffect(() => {
        if (!open) {
            setData({})
        }
    }, [open])

    const onSubmit = () => {
        if (isError()) {
            setTouchId(true)
            return
        }
        navigate(`/Admin/students/marks?branch=${data.branch}&semister=${data.semister}`)
    }

    const schema = [
        {
            label: "Branch",
            name: 'branch',
            dep: open,
            api: () => Branch.getMany({}),
            Options: (da) => da.map(d => <option value={d._id}>{d.branch_name}</option>),
            error: { required: true }
        },
        {
            name: 'semister',
            label: "Select semister",
            dep: branch,
            api: () => Branch.getByIdWithSemisters({ id: branch }),
            Options: (da) => da && da.semisters && da.semisters.map(d => <option value={d._id}>{d.name}</option>),
            error: { required: true }
        },
    ]



    return <Modal open={open} onClose={onClose}>
        <Box sx={{ px: 4, pb: 4 }}>
            <h3>Select Details</h3>
            <br />
            <Stack gap={2}>
                {schema.map(d => {
                    return <ApiSelect
                        dep={d.dep}
                        api={d.api}
                        Options={d.Options}
                        {...inputProps(d)}
                    />
                })}
                <br />
                <Button onClick={onSubmit} fullWidth variant='contained'>Go To Marks Page</Button>
            </Stack>
        </Box>
    </Modal>
}

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
                        <Link to={`/Admin/student/${id}/complaints`}><MenuItem>Complaints</MenuItem></Link>
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