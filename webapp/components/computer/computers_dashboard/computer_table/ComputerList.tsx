import { DataGrid, GridRowId, GridSelectionModel } from '@mui/x-data-grid'
import ComputerTypeIdentifier from 'components/computer/computers_dashboard/computer_table/ComputerTypeIdentifier'
import { SelectedComputersContext } from 'components/computer/computers_dashboard/ComputersDashboard'
import { ComputerType } from 'components/shared/enums'
import React, { useContext } from 'react'

interface Computer {
    name: string,
    type: string,
    label?: string,
    serial?: string,
    location?: string,
}

export interface Props {
    computers: Computer[],
    onComputerClick(name: GridRowId): void,
}

function ComputerList(props: Props) {
    const { state: selectedContext, setState: setSelectedContext } = useContext(SelectedComputersContext)

    const columnDefaults = {
        width: 200,
        sortable: false,
        filterable: false,
        cellClassName: 'defaultCell',
    }

    const columns = [
        {
            ...columnDefaults,
            field: 'type',
            headerName: 'Desktop',
            width: 130,
            renderCell: (params) => <ComputerTypeIdentifier type={params.value} name={params.id}/>,
        },
        { ...columnDefaults, field: 'name', headerName: 'Name' },
        { ...columnDefaults, field: 'label', headerName: 'Label' },
        { ...columnDefaults, field: 'inventory', headerName: 'Inventory number' },
        { ...columnDefaults, field: 'location', headerName: 'Location' },
    ]

    const rows = props.computers.map((computer) => {
        return {
            id: computer.name,
            name: computer.name,
            type: ComputerType[computer.type],
            label: computer.label,
            inventory: computer.serial,
            location: computer.location,
        }
    })

    return (
        <div className='dashboard' style={{ display: 'flex', height: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                // autoPageSize
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelected: GridSelectionModel) => setSelectedContext(newSelected)}
                onRowClick={(params) => props.onComputerClick(params.id)}
                // sortingMode='server'
                // sortModel={sorting}
                // onSortModelChange={handleSorting}
            />
        </div>
    )
}

export default ComputerList
