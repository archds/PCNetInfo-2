import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import style from '/styles/ComputerFilter.module.scss'

const filterValue = {
    any: 'ANY',
    specified: 'SPECIFIED',
    notSpecified: 'NOT_SPECIFIED',
}


export interface Props {
    filterComputers(serialFilter: string, locationFilter: string, formFactorFilter: string): void
}

function Filter(props: Props) {
    const [serialNumberFilter, setSerialNumberFilter] = useState(filterValue.any)
    const [locationFilter, setLocationFilter] = useState(filterValue.any)
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
            props.filterComputers(
                serialNumberFilter === filterValue.any ? null : serialNumberFilter,
                locationFilter === filterValue.any ? null : locationFilter,
                formFactorFilter,
            )
        }
    }, [serialNumberFilter, locationFilter, formFactorFilter])


    return (
        <div className={style.filterContainer}>
            <FormControl>
                <InputLabel shrink id='serial-label'>
                    Serial number
                </InputLabel>
                <Select
                    labelId='serial-label'
                    id='serial'
                    value={serialNumberFilter}
                    style={{width: 150}}
                >
                    <MenuItem
                        value={filterValue.any}
                        onClick={() => setSerialNumberFilter(filterValue.any)}
                    >
                        Any
                    </MenuItem>
                    <MenuItem
                        value={filterValue.specified}
                        onClick={() => setSerialNumberFilter(filterValue.specified)}
                    >
                        Specified
                    </MenuItem>
                    <MenuItem
                        value={filterValue.notSpecified}
                        onClick={() => setSerialNumberFilter(filterValue.notSpecified)}
                    >
                        Not specified
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel shrink id='serial-label'>
                    Location
                </InputLabel>
                <Select
                    labelId='serial-label'
                    id='serial'
                    value={locationFilter}
                    style={{width: 150}}
                >
                    <MenuItem
                        value={filterValue.any}
                        onClick={() => setLocationFilter(filterValue.any)}
                    >
                        Any
                    </MenuItem>
                    <MenuItem
                        value={filterValue.specified}
                        onClick={() => setLocationFilter(filterValue.specified)}
                    >
                        Specified
                    </MenuItem>
                    <MenuItem
                        value={filterValue.notSpecified}
                        onClick={() => setLocationFilter(filterValue.notSpecified)}
                    >
                        Not specified
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default Filter
