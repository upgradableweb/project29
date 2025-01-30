import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper } from '@mui/material';
import moment from 'moment';
import TablePaginated from './TablePaginated';
import usePaginate from './usePaginate';
import { Notice } from '../v2/api';


const noticeColumns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
];


const SeeNotice = () => {

    const getData = (page) => Notice.getMany({ body: page })
    const { data, isEmpty, ...pagination } = usePaginate(getData)

    const rows = data.map(d=>{
        const date = moment(d.date).format('DD-MM-YYYY')
        return {...d, date }
    })


    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h3>
            {isEmpty ?
                <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
                : <Paper>
                    <TablePaginated columns={noticeColumns} rows={rows} pagination={pagination} />
                </Paper>}
        </div>

    )
}

export default SeeNotice