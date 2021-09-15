import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-bootstrap'

function Search(props) {
    return (
        <Form.Control
            type='text'
            placeholder='Search...'
            style={{ maxWidth: 200 }}
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