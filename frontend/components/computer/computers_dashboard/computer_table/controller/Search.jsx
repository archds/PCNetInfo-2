import { Input } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

function Search(props) {
    return (
        <Input
            placeholder='Search...'
            id='search'
            onInput={(event => {
                if (event.target.value.length > 2) {
                    props.onSearchChange(event.target.value)
                }
                if (!event.target.value) {
                    props.onSearchChange(null)
                }
            })}
        />
    )
}

export default Search

Search.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
}