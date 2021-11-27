import style from '/components/computer/controller/ControllerDashboard.module.scss'
import { Button, Collapse } from '@material-ui/core'
import Sorting from 'components/computer/controller/Sorting'
import { FilterType, SortingType } from 'core/enums'
import { FilterState } from 'core/state'
import React, { useEffect, useRef, useState } from 'react'
import Filter from 'components/computer/controller/Filter'
import Search from 'components/computer/controller/Search'

enum ActiveAction {
    FILTER,
    SORTING
}

export interface Props {
    disabled: boolean
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

    return (
        <div>
            <div className={style.controller}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => switchCollapse(ActiveAction.SORTING)}
                    disabled={props.disabled}
                >
                    Sorting
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => switchCollapse(ActiveAction.FILTER)}
                    disabled={props.disabled}
                >
                    Filter
                </Button>
                <Search onSearchChange={onSearchChange} inputProps={{disabled: props.disabled}}/>
            </div>
            <div>
                <Collapse in={showSorting}>
                    <Sorting onSortingChange={onSortingChange}/>
                </Collapse>
                <Collapse in={showFilter}>
                    <Filter filterComputers={onFilterChange}/>
                </Collapse>
            </div>
        </div>
    )
}

export default TableController
