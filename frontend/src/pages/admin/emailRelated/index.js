import React, { useState } from 'react'
import TablePaginated from '../../../components/TablePaginated'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import FetchIt from '../../../v2/api/FetchIt'
import usePaginate from '../../../components/usePaginate'
import moment from 'moment'
import { Refresh } from '@mui/icons-material'



const columns = [
    { id: 'time', label: 'Time', minWidth: 170 },
    { id: 'from', label: 'From', maxWidth: 270 },
    { id: 'to', label: 'To', minWidth: 170 },
    { id: 'type', label: 'type', minWidth: 170 },
    { id: 'subject', label: 'Subject', minWidth: 170 },
    { id: 'status', label: 'Status', }
]

const extractEmail = (text) => {
    const match = text.match(/[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : null;
};

const emails = new FetchIt('/v2/emails')

const now = moment();
export default function EmailsRealted() {

    const getData = body => emails.post({ body:{ ...body, sortKey: "createdAt", sortOrder: -1 } })
    const { data, isEmpty, setData, message, ...pagination } = usePaginate(getData)

    const rows = data.map(d => {
        const hours = now.diff(moment(d.createdAt), 'hours');
        let time = hours > 20 ? moment(d.createdAt).format("DD/MM/YY hh:mm:ss A") : moment(d.createdAt).fromNow()
        let type = <Typography textTransform={"uppercase"}>{d.type}</Typography>
        let from = extractEmail(d.from)
        let status = <Button color='success' disableElevation disableRipple variant='contained' size='small'>Success</Button>
        return { ...d, time, type, from, status }
    })

    return (
        <Box>
            <Stack alignItems={"end"} pr={2} pt={2}>
            <Button color='inherit' onClick={()=>window.location.reload()}><Refresh />Refresh</Button>
            </Stack>
        <Paper sx={{ p: 4, m: 2 }}>
            <TablePaginated columns={columns} rows={rows} pagination={pagination} />
        </Paper>
        </Box>
    )
}
