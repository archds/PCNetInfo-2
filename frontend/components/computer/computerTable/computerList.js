import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import {Table} from 'react-bootstrap'
import ComputerElement from './ComputerElement'
import {useQuery} from '@apollo/client'
import {allPCQuery} from '/gql_api/queries/allPC'
import style from '/styles/ComputersDashboard.module.scss'

function ComputerList(props) {
    const {data, error, loading, refetch} = useQuery(allPCQuery)
    const [selectedComputers, setSelectedComputers] = useState([])
    const mounted = useRef(false)

    const switchSelection = (computerName) => {
        if (selectedComputers.includes(computerName)) {
            setSelectedComputers(prevState => prevState.filter(computer => computer !== computerName))
        } else {
            setSelectedComputers(prevState => [computerName, ...prevState])
        }
    }

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            refetch({
                sorting: props.sorting,
                filter: props.filter,
                search: props.search,
            })
        }
    }, [refetch, props.sorting, props.filter, props.search])

    useEffect(() => {
        props.showActions(!!selectedComputers.length)
    }, [props, selectedComputers])


    if (loading) {
        return <div className={style.computersContainer}>
            <div className={style.ldsDualRing}></div>
        </div>
    }

    return (
        <Table hover>
            <thead>
            <tr>
                <th key="checkbox">
                    {/*<FormCheck*/}
                    {/*    type='checkbox'*/}
                    {/*/>*/}
                </th>
                <th>Type</th>
                <th>Label</th>
                <th>Inventory number</th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            {data.AllPC.map(computer => {
                return (
                    <ComputerElement
                        key={computer.name}
                        pc={computer}
                        onComputerClick={props.onComputerClick}
                        switchSelection={switchSelection}
                    />
                )
            })}
            </tbody>
        </Table>
    )
}

export default ComputerList

ComputerList.propTypes = {
    filter: PropTypes.object,
    onComputerClick: PropTypes.func.isRequired,
    search: PropTypes.string,
    showActions: PropTypes.func.isRequired,
    sorting: PropTypes.string,
}