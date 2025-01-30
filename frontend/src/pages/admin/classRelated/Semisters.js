import React, { useEffect, useRef, useState } from 'react'
import { TextField, Button, Box, IconButton, Typography, Paper } from '@mui/material';
import Modal from '../../../components/Modal';
import useForm from '../../../components/useForm';
import { Semister } from '../../../v2/api';
import TableViewTemplate from '../../../components/TableViewTemplate';
import { Edit } from '@mui/icons-material';

const columns = [
    { id: 'name', label: 'Semister Name', minWidth: 170 },
    { id: 'edit', label: 'Edit' },
]

export default function Semisters() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [payload, setPayload] = useState(null)
    const [message, setMessage] = useState('')
    const id = payload?._id || "new"

    const getData = async () => {
        try {
            let res = await Semister.findMany({})
            setData(res)
        } catch (error) {
            alert(error.message)
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onClose = res => {

        if (res) {
            let f
            if (id == 'new') {
                f = [...data, res]
            } else {
                f = data.map(d => {
                    if (d._id == id) {
                        return { ...d, ...res }
                    }
                    return d
                })
            }
            setData(f)
        }
        setPayload(null)
    }

    const rows = data.map(d => {
        const edit = <Button variant='outlined' color='error' onClick={() => setPayload(d)}><Edit />Edit</Button> 
        return { ...d, edit }
    })

    return (
        <Box>
             <p>{message}</p>
            <button hidden id='add-semister' onClick={() => setPayload({})} ></button>
            <SemesterModal id={id} payload={payload} onClose={onClose} />
            <TableViewTemplate columns={columns} rows={rows} loading={loading} />
        </Box>
    )
}


const schema = [
    {
        name: 'name',
        label: "Semester name",
        placeholder: "Semister 1, Half Year",
        error: { required: true }
    }
]

function SemesterModal({ onClose, payload, id }) {

    const [error, setError] = useState('');
    const { data, inputProps, isError, setTouchId, setData } = useForm(schema, payload)


    const handleClose = () => onClose();
    const handleSubmit = async () => {
        if (isError()) {
            setTouchId(1)
            return
        }

        try {
            let res = await Semister.updateById({ _id: id, payload: data })
            setData({})
            onClose(res)
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div>
            <Modal open={payload} onClose={handleClose}>
                <Box px={4} pb={4}>
                    <h2>{id == "new" ? "Enter" : "Edit"} Semester Name</h2>
                    <br />
                    <TextField
                        fullWidth
                        {...inputProps(schema[0])}
                    />
                    <Typography color={'red'} >{error}</Typography>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
