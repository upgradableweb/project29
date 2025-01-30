import React, { useEffect, useRef, useState } from 'react'
import { TextField, Button, Box, IconButton, Typography, CircularProgress, Tooltip } from '@mui/material';
import { Branch, Semister } from '../../../v2/api';
import TableViewTemplate from '../../../components/TableViewTemplate';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useToast from '../../../components/useToast';

const columns = [
    { id: 'branch_name', label: 'Branch Name', minWidth: 170 },
    { id: 'branch_code', label: 'Branch Code', minWidth: 170 },
    { id: 'semisters', label: 'Semisters', minWidth: 170 },
    { id: 'edit', label: 'Edit' },
]

export default function BranchTable() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const { ToastContainer, ToastMessage } = useToast()

    const getData = async () => {
        try {
            let res = await Branch.getMany({})
            setData(res)
        } catch (error) {
            ToastMessage(error.message)
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const rows = data.map(d => {
        const edit = <Link to={'/Admin/classes/branch/' + d._id}><Button variant='outlined' color='error'><Edit />Edit</Button></Link>
        const semisters = <Box>{d.semisters.length}</Box>
        return { ...d, edit, semisters }
    })

    return (
        <>
            <p>{message}</p>
            {ToastContainer}
            <TableViewTemplate columns={columns} rows={rows} Loading={loading && CircularProgress} />
        </>
    )
}