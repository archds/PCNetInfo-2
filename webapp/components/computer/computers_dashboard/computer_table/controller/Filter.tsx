import style from '/styles/ComputerFilter.module.scss'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { FilterType } from 'core/enums'
import React, { useEffect, useRef, useState } from 'react'


export interface Props {
    filterComputers(serialFilter?: FilterType, locationFilter?: FilterType, formFactorFilter?: string): void
}

function Filter(props: Props) {
    const [serialNumberFilter, setSerialNumberFilter] = useState<FilterType>(FilterType.ANY)
    const [locationFilter, setLocationFilter] = useState(FilterType.ANY)
    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            props.filterComputers(
                serialNumberFilter === FilterType.ANY ? null : serialNumberFilter,
                locationFilter === FilterType.ANY ? null : locationFilter,
                null,
            )
        }
    }, [serialNumberFilter, locationFilter])


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
                    style={{ width: 150 }}
                >
                    <MenuItem
                        value={FilterType.ANY}
                        onClick={() => setSerialNumberFilter(FilterType.ANY)}
                    >
                        Any
                    </MenuItem>
                    <MenuItem
                        value={FilterType.SPECIFIED}
                        onClick={() => setSerialNumberFilter(FilterType.SPECIFIED)}
                    >
                        Specified
                    </MenuItem>
                    <MenuItem
                        value={FilterType.NOT_SPECIFIED}
                        onClick={() => setSerialNumberFilter(FilterType.NOT_SPECIFIED)}
                    >
                        Not specified
                    </MenuItem>
                </Select>
            </FormControl>
            <FormControl disabled>
                <InputLabel shrink id='serial-label'>
                    Location
                </InputLabel>
                <Select
                    labelId='serial-label'
                    id='serial'
                    value={locationFilter}
                    style={{ width: 150 }}
                >
                    <MenuItem
                        value={FilterType.ANY}
                        onClick={() => setLocationFilter(FilterType.ANY)}
                    >
                        Any
                    </MenuItem>
                    <MenuItem
                        value={FilterType.SPECIFIED}
                        onClick={() => setLocationFilter(FilterType.SPECIFIED)}
                    >
                        Specified
                    </MenuItem>
                    <MenuItem
                        value={FilterType.NOT_SPECIFIED}
                        onClick={() => setLocationFilter(FilterType.NOT_SPECIFIED)}
                    >
                        Not specified
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default Filter
