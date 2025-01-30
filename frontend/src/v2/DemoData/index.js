
import { createPortal } from 'react-dom'
import './demo.scss'
import { Box, Collapse, IconButton } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useState } from 'react'
import FetchIt from '../api/FetchIt'

const portal = document.getElementById('portal')

export const ParellelProccess = () => {
    return createPortal(<AppPortal/>, portal)
}


function AppPortal() {

    const [active, setActive] = useState(true)
    const [open, setOpen] = useState(false)


    if (active) {
        return
    }

    return <div className='portal-ontainer'>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, borderBottom: "1px solid #0002" }}>
            <h4>Parallel Process</h4>
            <IconButton onClick={() => setOpen(!open)}>{open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}</IconButton>
        </Box>
        <Collapse in={open}>
            <div className='content'>
                <div>
                    <br />
                    <p>No Data Found</p>
                    <br />
                </div>
            </div>
        </Collapse>
    </div>
}

const branches = new FetchIt('/demo/branch')

const DemoData = {
    branches,
    teachers: branches,
    students: branches,
}

export default DemoData
