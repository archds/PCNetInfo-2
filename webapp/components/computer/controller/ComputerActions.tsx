import style from '/components/computer/controller/ControllerDashboard.module.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import * as CSS from 'csstype'
import React from 'react'

export interface Props {
    disabled: boolean
    show: boolean
    onAddComputer(): void
    onDelete(): void
}

function ComputerActions(props: Props) {
    const delButtonStyles: CSS.Properties = {
        visibility: props.show ? 'visible' : 'hidden',
        opacity: props.show ? 100 : 0,
        backgroundColor: '#D32F2F',
        color: 'white',
        transition: '0.3s',
    }

    return (
        <div className={style.computerActions}>
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
        </div>
    )
}

export default ComputerActions

