import PropTypes from 'prop-types'
import React, {useRef} from 'react'
import {Table} from 'react-bootstrap'
import ComputerElement from './ComputerElement'

function ComputerList(props) {
    return (
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
    )
}

export default ComputerList

ComputerList.propTypes = {
    computers: PropTypes.array.isRequired,
    onComputerClick: PropTypes.func.isRequired,
    switchSelection: PropTypes.func.isRequired,
}