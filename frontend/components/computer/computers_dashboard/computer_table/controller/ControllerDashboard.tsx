import PropTypes from 'prop-types'
import React from 'react'
import style from '/styles/ComputersDashboard.module.scss'
import ComputerActions from './ComputerActions'
import TableController from './TableController'

export interface Props {
    onAddComputer(): void,
    onControllerChange(sorting: string, filter: object, search: string): void,
    onDelete(): void,
    showActions: boolean,
}

function ControllerDashboard(props: Props) {
    const onControllerChange = (sorting, filter, search) => {
        props.onControllerChange(sorting, filter, search)
    }

    return (
        <div className='dashboard'>
            <div className={style.controllerContainer}>
                <TableController onControllerChange={onControllerChange}/>
                <ComputerActions onDelete={props.onDelete} show={props.showActions}
                                 onAddComputer={props.onAddComputer}/>
            </div>
        </div>
    )
}

export default ControllerDashboard
