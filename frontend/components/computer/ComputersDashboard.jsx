import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import style from '/styles/ComputersDashboard.module.scss'
import {Button, Dropdown, Form} from 'react-bootstrap'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Collapse} from 'react-collapse'
import ComputerFilter from './computerTable/ComputerFilter'
import ComputerList from './computerTable/ComputerList'
import {deletePC} from '/gql_api/mutations/deletePC'
import {useMutation, useQuery} from '@apollo/client'
import {allPCQuery} from 'gql_api/queries/allPC'
import ModalConfirm from '../ModalConfirm'

function ComputersDashboard(props) {
    // Main data
    const {data, error, loading, refetch} = useQuery(allPCQuery)
    // Management control
    const [filter, setFilter] = useState({})
    const [sorting, setSorting] = useState('LABEL')
    const [search, setSearch] = useState(null)
    const [selectedComputers, setSelectedComputers] = useState([])
    // Display control
    const [computerActions, setComputerActions] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const switchSelection = (computerName) => {
        if (selectedComputers.includes(computerName)) {
            setSelectedComputers(prevState => prevState.filter(computer => computer !== computerName))
        } else {
            setSelectedComputers(prevState => [computerName, ...prevState])
        }
    }

    useEffect(() => {
        setComputerActions(!!selectedComputers.length)
    }, [selectedComputers])

    useEffect(() => {
        refetch({
            sorting: sorting,
            filter: filter,
            search: search,
        })
    }, [sorting, filter, search])

    const [deleteComputers] = useMutation(deletePC, {
        variables: {
            names: selectedComputers,
        },
        refetchQueries: [
            allPCQuery,
        ],
        onCompleted: () => {
            setSelectedComputers([])
            setShowDeleteModal(false)
        },
    })


    if (loading) {
        return <div className={style.computersContainer}>
            <div className={style.ldsDualRing}></div>
        </div>
    }

    return (
        <div className={style.computersContainer}>
            <div className='dashboard'>
                <div className={style.controllerContainer}>
                    <div className={style.controller}>
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
                        <Button variant='outline-primary' onClick={() => setShowFilter(!showFilter)}>Filter</Button>
                        <Form.Control
                            type='text'
                            placeholder='Search...'
                            style={{maxWidth: 200}}
                            onInput={(event => {
                                if (event.target.value.length > 2) {
                                    setSearch(event.target.value)
                                }
                                if (!event.target.value) {
                                    setSearch(null)
                                }
                            })}
                        />
                    </div>
                    <div className={style.computerActions}>
                        {
                            computerActions ?
                                <Button
                                    variant='outline-danger'
                                    className='iconButton'
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    <RiDeleteBin6Line/>
                                </Button> : null
                        }
                    </div>
                </div>
                <Collapse isOpened={showFilter}>
                    <ComputerFilter
                        filterComputers={(serialNumber, location, formFactor) => {
                            setFilter({
                                serialNumber: serialNumber,
                                location: location,
                                formFactor: formFactor,
                            })
                        }}
                    />
                </Collapse>
            </div>
            <div className='dashboard'>
                <ComputerList
                    onComputerClick={props.onComputerClick}
                    switchSelection={switchSelection}
                    computers={data.AllPC}
                />
            </div>
            <ModalConfirm
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={deleteComputers}
                modalHeading={'Delete this PC?'}
                modalBody={`To delete: ${selectedComputers.join(', ')}`}
                show={showDeleteModal}
            />
        </div>
    )
}

export default ComputersDashboard

ComputersDashboard.propTypes = {
    onComputerClick: PropTypes.func.isRequired,
}