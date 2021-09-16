import style from '/styles/ComputersDashboard.module.scss'
import { Button } from '@material-ui/core'
import Sorting from 'components/computer/computers_dashboard/computer_table/controller/Sorting'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Collapse } from 'react-collapse'
import Filter from './Filter'
import Search from './Search'

const collapse = {
    filter: 'FILTER',
    sorting: 'SORTING',
}

function TableController(props) {
    const [search, setSearch] = useState(null)
    const [filter, setFilter] = useState({})
    const [sorting, setSorting] = useState('LABEL')
    const [showFilter, setShowFilter] = useState(false)
    const [showSorting, setShowSorting] = useState(false)
    const mounted = useRef(false)

    const onSearchChange = (search) => setSearch(search)
    const onFilterChange = (serialNumber, location, formFactor) => setFilter({
        serialNumber: serialNumber,
        location: location,
        formFactor: formFactor,
    })
    const onSortingChange = (sorting) => setSorting(sorting)

    const switchCollapse = (collapseType) => {
        if (collapseType === collapse.filter) {
            setShowFilter(prevState => !prevState)
            setShowSorting(false)
        }
        if (collapseType === collapse.sorting) {
            setShowSorting(prevState => !prevState)
            setShowFilter(false)
        }
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            props.onControllerChange(sorting, filter, search)
        }
    }, [sorting, filter, search])


    return (
        <div>
            <div className={style.controller}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => switchCollapse(collapse.sorting)}
                >
                    Sorting
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => switchCollapse(collapse.filter)}
                >
                    Filter
                </Button>
                <Search onSearchChange={onSearchChange}/>
            </div>
            <div>
                <Collapse isOpened={showFilter}>
                    <Filter filterComputers={onFilterChange}/>
                </Collapse>
                <Collapse isOpened={showSorting}>
                    <Sorting onSortingChange={onSortingChange}/>
                </Collapse>
            </div>
        </div>
    )
}

export default TableController

TableController.propTypes = {
    onControllerChange: PropTypes.func.isRequired,
}