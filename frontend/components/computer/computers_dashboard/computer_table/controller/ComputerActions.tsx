import style from '/styles/ComputersDashboard.module.scss'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

export interface Props {
    onAddComputer(): void
    onDelete(): void
    show: boolean
}

function ComputerActions(props: Props) {
    const buttonEl = useRef(null)

    useEffect(() => {
        buttonEl.current.style.visibility = props.show ? 'visible' : 'hidden'
        buttonEl.current.style.opacity = props.show ? 100 : 0
    }, [props])


    return (
        <div className={style.computerActions}>
            <Button
                disableElevation
                ref={buttonEl}
                variant='contained'
                onClick={props.onDelete}
                startIcon={<DeleteIcon/>}
                style={{ backgroundColor: '#d32f2f', color: 'white' }}
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

