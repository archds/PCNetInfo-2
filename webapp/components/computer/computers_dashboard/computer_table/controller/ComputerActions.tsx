import style from '/styles/ComputersDashboard.module.scss'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import * as CSS from 'csstype'
import React from 'react'

export interface Props {
    show: boolean
    onAddComputer(): void
    onDelete(): void
}

function ComputerActions(props: Props) {
    const delButtonStyles: CSS.Properties = {
        visibility: props.show ? 'visible' : 'hidden',
        opacity: props.show ? 100 : 0,
        backgroundColor: '#d32f2f',
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
            >
                Delete
            </Button>
            <Button
                disableElevation
                onClick={props.onAddComputer}
                variant='contained'
                color='primary'
            >
                Add
            </Button>
        </div>
    )
}

export default ComputerActions

