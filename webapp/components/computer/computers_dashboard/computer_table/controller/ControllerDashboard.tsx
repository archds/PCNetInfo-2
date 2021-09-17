import style from '/styles/ComputersDashboard.module.scss'
import { SortingType } from 'domain/enums'
import { FilterState } from 'domain/state'
import React from 'react'
import ComputerActions from './ComputerActions'
import TableController from './TableController'

export interface Props {
    showActions: boolean,
    onAddComputer(): void,
    onControllerChange(sorting: SortingType, filter: FilterState, search: string): void,
    onDelete(): void,
}

function ControllerDashboard(props: Props) {
    return (
        <div className='dashboard'>
            <div className={style.controllerContainer}>
                <TableController onControllerChange={props.onControllerChange}/>
                <ComputerActions
                    onDelete={props.onDelete} show={props.showActions}
                    onAddComputer={props.onAddComputer}
                />
            </div>
        </div>
    )
}

export default ControllerDashboard
