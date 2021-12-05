import style from '/components/computer/controller/ControllerDashboard.module.scss'
import { FilterInput, SortField } from 'api/generated/graphql'
import ComputerActions from 'components/computer/controller/ComputerActions'
import TableController from 'components/computer/controller/TableController'
import React from 'react'

export interface Props {
    showActions: boolean,
    disabled: boolean
    onAddComputer(): void,
    onControllerChange(sorting: SortField, filter: FilterInput, search: string): void,
    onDelete(): void,
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
