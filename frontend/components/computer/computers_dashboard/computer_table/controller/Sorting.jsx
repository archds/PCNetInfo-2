import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

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
        <Dropdown>
            <Dropdown.Toggle variant='outline-primary' id='sorting-dropdown'>
                Sorting
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSorting('LABEL')} active={'LABEL' === sorting}>
                    Label
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSorting('SERIAL')} active={'SERIAL' === sorting}>
                    Serial
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSorting('CPU')} active={'CPU' === sorting}>
                    CPU Performance
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSorting('MEMORY')} active={'MEMORY' === sorting}>
                    Memory size
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Sorting

Sorting.propTypes = {
  onSortingChange: PropTypes.func.isRequired
}