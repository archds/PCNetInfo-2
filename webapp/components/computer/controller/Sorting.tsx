import { Button, ButtonGroup } from '@material-ui/core'
import { SortField } from 'api/generated/graphql'
import React, { useEffect, useRef, useState } from 'react'


export interface Props {
    onSortingChange(sorting: SortField): void
}


function Sorting(props: Props) {
    const [sorting, setSorting] = useState<SortField>(SortField.LABEL)
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
                    variant={sorting === SortField.LABEL ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortField.LABEL)}
                >
                    Label
                </Button>
                <Button
                    variant={sorting === SortField.SERIAL ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortField.SERIAL)}
                >
                    Serial
                </Button>
                <Button
                    variant={sorting === SortField.CPU ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortField.CPU)}
                >
                    CPU Performance
                </Button>
                <Button
                    variant={sorting === SortField.MEMORY ? 'contained' : 'outlined'}
                    onClick={() => setSorting(SortField.MEMORY)}
                >
                    Memory size
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default Sorting
