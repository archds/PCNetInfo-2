import style from '/styles/ComputersDashboard.module.scss'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Collapse } from 'react-collapse'
import Filter from './Filter'
import Search from './Search'
import Sorting from './Sorting'

function TableController(props) {
    const [search, setSearch] = useState(null)
    const [filter, setFilter] = useState({})
    const [sorting, setSorting] = useState('LABEL')
    const [showFilter, setShowFilter] = useState(false)
    const mounted = useRef(false)

    const onSearchChange = (search) => setSearch(search)
    const onFilterChange = (serialNumber, location, formFactor) => setFilter({
        serialNumber: serialNumber,
        location: location,
        formFactor: formFactor,
    })
    const onSortingChange = (sorting) => setSorting(sorting)

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
                <Sorting onSortingChange={onSortingChange}/>
                <Button variant='outline-primary' onClick={() => setShowFilter(prevState => !prevState)}>Filter</Button>
                <Search onSearchChange={onSearchChange}/>
            </div>
            <div>
                <Collapse isOpened={showFilter}>
                    <Filter filterComputers={onFilterChange}/>
                </Collapse>
            </div>
        </div>
    )
}

export default TableController

TableController.propTypes = {
    onControllerChange: PropTypes.func.isRequired,
}