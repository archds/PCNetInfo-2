import style from '/components/computer/controller/ControllerDashboard.module.scss'
import { SortingType } from 'core/enums'
import { FilterState } from 'core/state'
import React from 'react'
import ComputerActions from 'components/computer/controller/ComputerActions'
import TableController from 'components/computer/controller/TableController'

export interface Props {
    showActions: boolean,
    onAddComputer(): void,
    onControllerChange(sorting: SortingType, filter: FilterState, search: string): void,
    onDelete(): void,
    disabled: boolean
}

function ControllerDashboard(props: Props) {
    return (
        <div className='dashboard'>
            <div className={style.controllerContainer}>
                <TableController onControllerChange={props.onControllerChange} disabled={props.disabled}/>
                <ComputerActions
                    onDelete={props.onDelete} show={props.showActions}
                    onAddComputer={props.onAddComputer}
                    disabled={props.disabled}
                />
            </div>
        </div>
    )
}

export default ControllerDashboard
