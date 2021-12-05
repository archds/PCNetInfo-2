import style from '/components/computer/controller/Filter.module.scss'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { FilterValue, FormFactor } from 'api/generated/graphql'
import React, { useEffect, useRef, useState } from 'react'


export interface Props {
    filterComputers(serialNumber: FilterValue, location: FilterValue, formFactor: FormFactor): void
}

function Filter(props: Props) {
    const [serialNumberFilter, setSerialNumberFilter] = useState<FilterValue>(undefined)
    const [locationFilter, setLocationFilter] = useState<FilterValue>(undefined)
    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            props.filterComputers(
                serialNumberFilter === undefined ? null : serialNumberFilter,
                locationFilter === undefined ? null : locationFilter,
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
                    value={serialNumberFilter || 'Any'}
                    style={{ width: 150 }}
                >
                    <MenuItem
                        value='Any'
                        onClick={() => setSerialNumberFilter(undefined)}
                    >
                        Any
                    </MenuItem>
                    <MenuItem
                        value={FilterValue.SPECIFIED}
                        onClick={() => setSerialNumberFilter(FilterValue.SPECIFIED)}
                    >
                        Specified
                    </MenuItem>
                    <MenuItem
                        value={FilterValue.NOT_SPECIFIED}
                        onClick={() => setSerialNumberFilter(FilterValue.NOT_SPECIFIED)}
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
                    value={locationFilter || 'Any'}
                    style={{ width: 150 }}
                >
                    <MenuItem
                        value='Any'
                        onClick={() => setLocationFilter(undefined)}
                    >
                        Any
                    </MenuItem>
                    <MenuItem
                        value={FilterValue.SPECIFIED}
                        onClick={() => setLocationFilter(FilterValue.SPECIFIED)}
                    >
                        Specified
                    </MenuItem>
                    <MenuItem
                        value={FilterValue.NOT_SPECIFIED}
                        onClick={() => setLocationFilter(FilterValue.NOT_SPECIFIED)}
                    >
                        Not specified
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default Filter
