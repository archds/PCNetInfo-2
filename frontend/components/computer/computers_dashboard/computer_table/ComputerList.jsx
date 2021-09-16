import { DataGrid } from '@mui/x-data-grid'
import ComputerType from 'components/computer/computers_dashboard/computer_table/ComputerType'
import PropTypes from 'prop-types'
import React from 'react'

function ComputerList(props) {
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
            renderCell: (params) => <ComputerType type={params.value} name={params.id}/>,
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
            type: computer.type,
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
                onSelectionModelChange={(newSelected) => props.switchSelection(newSelected)}
                onRowClick={(params) => props.onComputerClick(params.id)}
                // sortingMode='server'
                // sortModel={sorting}
                // onSortModelChange={handleSorting}
            />
        </div>
    )
}

export default ComputerList

ComputerList.propTypes = {
    computers: PropTypes.array.isRequired,
    onComputerClick: PropTypes.func.isRequired,
    switchSelection: PropTypes.func.isRequired,
}