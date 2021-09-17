import style from '/styles/ComputersDashboard.module.scss'
import {Button} from '@material-ui/core'
import Sorting from 'components/computer/computers_dashboard/computer_table/controller/Sorting'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import {Collapse} from 'react-collapse'
import Filter from './Filter'
import Search from './Search'

enum ActiveAction {
    FILTER,
    SORTING
}

export interface Props {
    onControllerChange(sorting: string, filter: object, search: string): null
}

function TableController(props: Props) {
    const [search, setSearch] = useState(null)
    const [filter, setFilter] = useState({})
    const [sorting, setSorting] = useState('LABEL')
    const [showFilter, setShowFilter] = useState(false)
    const [showSorting, setShowSorting] = useState(false)
    const mounted = useRef(false)

    const onSearchChange = (search?: string): void => setSearch(search)
    const onFilterChange = (serialNumber: string, location: string, formFactor: string): void => setFilter({
        serialNumber: serialNumber,
        location: location,
        formFactor: formFactor,
    })
    const onSortingChange = (sorting: string): void => setSorting(sorting)

    const switchCollapse = (collapseType: ActiveAction): null => {
        switch (collapseType) {
            case ActiveAction.FILTER:
                setShowFilter(prevState => !prevState)
                setShowSorting(false)
                return
            case ActiveAction.SORTING:
                setShowSorting(prevState => !prevState)
                setShowFilter(false)
                return
        }
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            props.onControllerChange(sorting, filter, search)
        }
    }, [sorting, filter, search])


    // @ts-ignore
    return (
        <div>
            <div className={style.controller}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => switchCollapse(ActiveAction.SORTING)}
                >
                    Sorting
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => switchCollapse(ActiveAction.FILTER)}
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
