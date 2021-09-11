import PropTypes from 'prop-types'
import React, {useState} from 'react'
import style from '/styles/ComputersDashboard.module.scss'
import {Button, Dropdown, Form} from 'react-bootstrap'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Collapse} from 'react-collapse'
import ComputerFilter from './computerTable/ComputerFilter'
import ComputerList from './computerTable/computerList'
import deletePC from '/gql_api/mutations/deletePC'
import client from '/apollo-client'

function ComputersDashboard(props) {
    const [computerActions, setComputerActions] = useState(false)
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
            formFactor: formFactor,
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

    const deleteComputers = (computerName) => {
        client.query({
            query: deletePC,
            variables: computerName,
        })
    }

    return (
        <div className={style.computersContainer}>
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
                    {computerActions ?
                        <Button variant="outline-danger" className="iconButton"><RiDeleteBin6Line/></Button> : null}
                </div>
                <Collapse isOpened={showFilter}>
                    <ComputerFilter filterComputers={filterComputers}/>
                </Collapse>
            </div>
            <div className="dashboard">
                <ComputerList
                    search={search}
                    filter={filter}
                    sorting={sorting}
                    showActions={setComputerActions}
                    onComputerClick={props.onComputerClick}
                />
            </div>
        </div>
    )
}

export default ComputersDashboard

ComputersDashboard.propTypes = {
    onComputerClick: PropTypes.func.isRequired,
}