import PropTypes from 'prop-types'
import React from 'react'
import { Table } from 'react-bootstrap'
import ComputerElement from './ComputerElement'

function ComputerList(props) {
    return (
        <div className='dashboard'>
            <Table hover>
                <thead>
                <tr>
                    <th key='checkbox'>
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
                {props.computers.map(computer => {
                    return (
                        <ComputerElement
                            key={computer.name}
                            pc={computer}
                            onComputerClick={props.onComputerClick}
                            switchSelection={props.switchSelection}
                        />
                    )
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default ComputerList

ComputerList.propTypes = {
    computers: PropTypes.array.isRequired,
    onComputerClick: PropTypes.func.isRequired,
    switchSelection: PropTypes.func.isRequired,
}