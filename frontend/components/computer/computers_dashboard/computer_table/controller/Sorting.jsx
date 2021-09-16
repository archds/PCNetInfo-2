import { Button, ButtonGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

const sortingType = {
    label: 'LABEL',
    serial: 'SERIAL',
    cpu: 'CPU',
    ram: 'MEMORY',
}

function Sorting(props) {
    const [sorting, setSorting] = useState('LABEL')
    const mounted = useRef(false)

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            props.onSortingChange(sorting)
        }
    }, [sorting])

    return (
        <div style={{ paddingTop: 20 }}>
            <ButtonGroup disableElevation color='secondary'>
                <Button
                    variant={sorting === sortingType.label ? 'contained' : 'outlined'}
                    onClick={() => setSorting(sortingType.label)}
                >
                    Label
                </Button>
                <Button
                    variant={sorting === sortingType.serial ? 'contained' : 'outlined'}
                    onClick={() => setSorting(sortingType.serial)}
                >
                    Serial
                </Button>
                <Button
                    variant={sorting === sortingType.cpu ? 'contained' : 'outlined'}
                    onClick={() => setSorting(sortingType.cpu)}
                >
                    CPU Performance
                </Button>
                <Button
                    variant={sorting === sortingType.ram ? 'contained' : 'outlined'}
                    onClick={() => setSorting(sortingType.ram)}
                >
                    Memory size
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default Sorting

Sorting.propTypes = {
    onSortingChange: PropTypes.func.isRequired,
}