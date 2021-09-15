import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import style from '/styles/ComputerFilter.module.scss'
import {Dropdown} from 'react-bootstrap'

const filterValue = {
    any: null,
    specified: 'SPECIFIED',
    notSpecified: 'NOT_SPECIFIED',
}

function Filter(props) {
    const [serialNumberFilter, setSerialNumberFilter] = useState(null)
    const [locationFilter, setLocationFilter] = useState(null)
    const [formFactorFilter, setFormFactorFilter] = useState('ATX')
    const mounted = useRef(false)

    const displayState = (state) => {
        if (state === filterValue.any) {
            return 'Any'
        } else if (state === filterValue.specified) {
            return 'Specified'
        } else if (state === filterValue.notSpecified) {
            return 'Not specified'
        } else {
            return state
        }
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            props.filterComputers(serialNumberFilter, locationFilter, formFactorFilter)
        }
    }, [serialNumberFilter, locationFilter, formFactorFilter])


    return (
        <div className={style.filterContainer}>
            <Dropdown>
                <Dropdown.Toggle variant='outline-secondary'>
                    Serial number: {displayState(serialNumberFilter)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        active={serialNumberFilter === filterValue.any}
                        onClick={() => setSerialNumberFilter(filterValue.any)}
                        className={style.filterDropdownItem}
                    >
                        Any
                    </Dropdown.Item>
                    <Dropdown.Item
                        active={serialNumberFilter === filterValue.specified}
                        onClick={() => setSerialNumberFilter(filterValue.specified)}
                        className={style.filterDropdownItem}
                    >
                        Specified
                    </Dropdown.Item>
                    <Dropdown.Item
                        active={serialNumberFilter === filterValue.notSpecified}
                        onClick={() => setSerialNumberFilter(filterValue.notSpecified)}
                        className={style.filterDropdownItem}
                    >
                        Not specified
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant='outline-secondary'>
                    Location: {displayState(locationFilter)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        active={locationFilter === filterValue.any}
                        onClick={() => setLocationFilter(filterValue.any)}
                        className={style.filterDropdownItem}
                    >
                        Any
                    </Dropdown.Item>
                    <Dropdown.Item
                        active={locationFilter === filterValue.specified}
                        onClick={() => setLocationFilter(filterValue.specified)}
                        className={style.filterDropdownItem}
                    >
                        Specified
                    </Dropdown.Item>
                    <Dropdown.Item
                        active={locationFilter === filterValue.notSpecified}
                        onClick={() => setLocationFilter(filterValue.notSpecified)}
                        className={style.filterDropdownItem}
                    >
                        Not specified
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle variant='outline-secondary'>
                    Form factor
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        active={formFactorFilter === 'ATX'}
                        onClick={() => setFormFactorFilter('ATX')}
                        className={style.filterDropdownItem}
                    >
                        ATX
                    </Dropdown.Item>
                    <Dropdown.Item
                        active={formFactorFilter === 'mATX'}
                        onClick={() => setFormFactorFilter('mATX')}
                        className={style.filterDropdownItem}
                    >
                        mATX
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Filter

Filter.propTypes = {
    filterComputers: PropTypes.func,
}