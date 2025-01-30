import { Close, ZoomIn } from '@mui/icons-material'
import { Box, IconButton, Modal as MuiModal } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1
};


export default function Modal({ open, onClose, children }) {
    return (
            <MuiModal open={open} onClose={onClose}>
                <Box sx={style}>
                    <Box display="flex" justifyContent="end" alignItems="center">
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Box>
                    {children}
                </Box>
            </MuiModal>
    )
}
