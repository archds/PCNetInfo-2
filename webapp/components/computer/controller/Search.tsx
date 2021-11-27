import { Input, InputProps } from '@material-ui/core'
import React from 'react'

export interface Props {
    onSearchChange(value?: string): void
    inputProps?: InputProps
}

function Search(props: Props) {
    return (
        <Input
            placeholder='Search...'
            id='search'
            onInput={((event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.value.length > 2) {
                    props.onSearchChange(event.target.value)
                }
                if (!event.target.value) {
                    props.onSearchChange(null)
                }
            })}
            {...props.inputProps}
        />
    )
}

export default Search
