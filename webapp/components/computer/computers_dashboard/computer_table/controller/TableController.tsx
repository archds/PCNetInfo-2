import style from '/styles/ComputersDashboard.module.scss'
import { Button, Collapse } from '@material-ui/core'
import Sorting from 'components/computer/computers_dashboard/computer_table/controller/Sorting'
import { FilterType, SortingType } from 'domain/enums'
import { FilterState } from 'domain/state'
import React, { useEffect, useRef, useState } from 'react'
import Filter from './Filter'
import Search from './Search'

enum ActiveAction {
    FILTER,
    SORTING
}

export interface Props {
    onControllerChange(sorting: SortingType, filter: FilterState, search: string): void
}

function TableController(props: Props) {
    const [search, setSearch] = useState(null)
    const [filter, setFilter] = useState<FilterState>({
        serialNumber: null,
        location: null,
        formFactor: null,
    })
    const [sorting, setSorting] = useState<SortingType>(SortingType.LABEL)
    const [showFilter, setShowFilter] = useState(false)
    const [showSorting, setShowSorting] = useState(false)
    const mounted = useRef(false)

    const onSearchChange = (search?: string): void => setSearch(search)
    const onFilterChange = (serialNumber: FilterType, location: FilterType, formFactor: string): void => setFilter({
        serialNumber: serialNumber,
        location: location,
        formFactor: formFactor,
    })
    const onSortingChange = (sorting: SortingType): void => setSorting(sorting)

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
                <Collapse in={showSorting}>
                    <Filter filterComputers={onFilterChange}/>
                </Collapse>
                <Collapse in={showFilter}>
                    <Sorting onSortingChange={onSortingChange}/>
                </Collapse>
            </div>
        </div>
    )
}

export default TableController
