import { Close, ZoomIn } from '@mui/icons-material'
import { Box, IconButton, Modal as MuiModal } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1
};


export default function Modal({ open, onClose, children }) {
    return (
            <MuiModal open={open} onClose={onClose && onClose}>
                <Box sx={style}>
                    <Box display="flex" justifyContent="end" alignItems="center">
                        <IconButton disabled={!onClose} onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Box>
                    {children}
                </Box>
            </MuiModal>
    )
}
