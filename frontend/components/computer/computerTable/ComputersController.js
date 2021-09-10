import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {Button, Dropdown, Form} from 'react-bootstrap'
import style from '/styles/ComputersController.module.scss'
import {Collapse} from 'react-collapse'
import ComputerFilter from '/components/computer/computerTable/ComputerFilter'

function ComputersController(props) {
    const [showFilter, setShowFilter] = useState(false)
    const [filter, setFilter] = useState({})
    const [sorting, setSorting] = useState('LABEL')
    const [search, setSearch] = useState(null)


    const sortComputers = (sortParam) => {
        setSorting(sortParam)
    }

    const filterComputers = (serialNumber, location, formFactor) => {
        setFilter({
            serialNumber: serialNumber,
            location: location,
            formFactor: formFactor
        })
    }

    const searchComputers = (searchString) => {
        if (searchString.length > 2) {
            setSearch(searchString)
        }
        if (!searchString) {
            setSearch(null)
        }
    }

    useEffect(() => {
        props.updateTable(sorting, filter, search)
    })


    return (
        <div className="dashboard">
            <div className={style.controllerContainer}>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" id="sorting-dropdown">
                        Sorting
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => sortComputers('LABEL')} active={'LABEL' === sorting}>
                            Label
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => sortComputers('SERIAL')} active={'SERIAL' === sorting}>
                            Serial
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => sortComputers('CPU')} active={'CPU' === sorting}>
                            CPU Performance
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => sortComputers('MEMORY')} active={'MEMORY' === sorting}>
                            Memory size
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="outline-primary" onClick={() => setShowFilter(!showFilter)}>Filter</Button>
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    style={{maxWidth: 200}}
                    onInput={(event => searchComputers(event.target.value))}
                />
            </div>
            <Collapse isOpened={showFilter}>
                <ComputerFilter filterComputers={filterComputers}/>
            </Collapse>
        </div>
    )
}

export default ComputersController

ComputersController.propTypes = {
  updateTable: PropTypes.func.isRequired
}