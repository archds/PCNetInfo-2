import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button } from '@mui/material'
import * as CSS from 'csstype'
import React from 'react'

export interface Props {
    disabled: boolean
    showDelete: boolean
    onAddComputer(): void
    onDelete(): void
}

function ComputerActions(props: Props) {
    const delButtonStyles: CSS.Properties = {
        visibility: props.showDelete ? 'visible' : 'hidden',
        opacity: props.showDelete ? 100 : 0,
        backgroundColor: '#D32F2F',
        color: 'white',
        transition: '0.3s',
    }

    return (
        <Box display='flex' gap='20px' maxHeight='38px'>
            <Button
                disableElevation
                variant='contained'
                onClick={props.onDelete}
                startIcon={<DeleteIcon/>}
                style={delButtonStyles}
                disabled={props.disabled}
            >
                Delete
            </Button>
            <Button
                disableElevation
                onClick={props.onAddComputer}
                variant='contained'
                color='primary'
                disabled={props.disabled}
            >
                Add
            </Button>
        </Box>
    )
}

export default ComputerActions

