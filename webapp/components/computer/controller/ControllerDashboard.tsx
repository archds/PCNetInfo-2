import { FilterInput, SortField } from 'api/generated/graphql'
import ComputerActions from 'components/computer/controller/ComputerActions'
import TableController from 'components/computer/controller/TableController'
import React from 'react'
import { Box, Paper } from '@mui/material'

export interface Props {
    showActions: boolean,
    disabled: boolean
    onAddComputer(): void,
    onControllerChange(sorting: SortField, filter: FilterInput, search: string): void,
    onDelete(): void,
}

function ControllerDashboard(props: Props) {
    return (
        <Paper sx={{ padding: '15px 40px', display: 'flex', justifyContent: 'space-between' }}>
            <Box><TableController onControllerChange={props.onControllerChange} disabled={props.disabled}/></Box>
            <ComputerActions
                onDelete={props.onDelete} show={props.showActions}
                onAddComputer={props.onAddComputer}
                disabled={props.disabled}
            />
        </Paper>
    )
}

export default ControllerDashboard
