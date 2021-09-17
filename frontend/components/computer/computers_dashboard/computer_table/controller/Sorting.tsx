import { Button, ButtonGroup } from '@material-ui/core'
import { SortingType } from 'domain/enums'
import React, { useEffect, useRef, useState } from 'react'

const sortingType = {
    label: 'LABEL',
    serial: 'SERIAL',
    cpu: 'CPU',
    ram: 'MEMORY',
}


export interface Props {
    onSortingChange(sorting: SortingType): void
}


function Sorting(props: Props) {
    const [sorting, setSorting] = useState<SortingType>(SortingType.LABEL)
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
                    variant={sorting === SortingType.LABEL ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortingType.LABEL)}
                >
                    Label
                </Button>
                <Button
                    variant={sorting === SortingType.SERIAL ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortingType.SERIAL)}
                >
                    Serial
                </Button>
                <Button
                    variant={sorting === SortingType.CPU ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortingType.CPU)}
                >
                    CPU Performance
                </Button>
                <Button
                    variant={sorting === SortingType.MEMORY ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortingType.MEMORY)}
                >
                    Memory size
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default Sorting
