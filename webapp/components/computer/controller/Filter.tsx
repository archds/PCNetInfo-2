import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FilterValue, FormFactor } from 'api/generated/graphql'
import React, { ReactElement, useEffect, useRef, useState } from 'react'


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

    const FilterSelect = ({ name, state, setState }): ReactElement => {
        const kebabName = name.replaceAll(' ', '-')
        const labelId = `${kebabName}-label`
        return <>
            <InputLabel id={labelId}>{name}</InputLabel>
            <Select label={name} labelId={labelId} id={kebabName} value={state || 'Any'} sx={{ width: 150 }}>
                <MenuItem value='Any' onClick={() => setState(undefined)}>Any</MenuItem>
                {[FilterValue.SPECIFIED, FilterValue.NOT_SPECIFIED].map((value) => {
                    let lowerValue = value.replaceAll('_', ' ').toLowerCase()
                    return <MenuItem
                        value={value}
                        onClick={() => setState(value)}
                    >{lowerValue[0].toUpperCase() + lowerValue.slice(1)}</MenuItem>
                })}
            </Select>
        </>
    }


    return (
        <Box display='flex' gap='20px' paddingTop='20px'>
            <FormControl>
                <FilterSelect name='Serial number' state={serialNumberFilter} setState={setSerialNumberFilter}/>
            </FormControl>
            <FormControl disabled>
                <FilterSelect name='Location' state={locationFilter} setState={setLocationFilter}/>
            </FormControl>
        </Box>
    )
}

export default Filter
