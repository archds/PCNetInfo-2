import {
    DataGrid,
    GridRowId,
    GridSelectionModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid'
import { Computer, ComputerType } from 'api/generated/graphql'
import { SelectedComputersContext } from 'components/computer/ComputersDashboard'
import ComputerTypeIdentifier from 'components/computer/ComputerTypeIdentifier'
import React, { useContext } from 'react'

export interface Props {
    computers: Computer[]
    onComputerClick(name: GridRowId): void
}

function ComputerList(props: Props) {
    const { state: selectedContext, setState: setSelectedContext } = useContext(SelectedComputersContext)
    const columnDefaults = { flex: 1, cellClassName: 'defaultCell' }

    const columns = [
        {
            ...columnDefaults,
            field: 'type',
            headerName: 'Type',
            flex: 0.5,
            renderCell: params => <ComputerTypeIdentifier type={params.value} id={params.id} />
        },
        { ...columnDefaults, field: 'name', headerName: 'Name' },
        { ...columnDefaults, field: 'label', headerName: 'Label' },
        { ...columnDefaults, field: 'inventory', headerName: 'Inventory number' },
        { ...columnDefaults, field: 'location', headerName: 'Location' }
    ]

    const rows = props.computers.map(computer => {
        return {
            id: computer.id,
            name: computer.name,
            type: ComputerType[computer.type],
            label: computer.label,
            inventory: computer.serial,
            location: computer.location
        }
    })

    const toolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </GridToolbarContainer>
        )
    }

    return (
        <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectedContext}
            onSelectionModelChange={(newSelected: GridSelectionModel) => setSelectedContext(newSelected)}
            onRowClick={params => props.onComputerClick(params.id)}
            components={{ Footer: toolbar }}
        />
    )
}

export default ComputerList
