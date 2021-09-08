import PropTypes from 'prop-types'
import {FormCheck, Table} from 'react-bootstrap'
import React from 'react'
import ComputerElement from "./ComputerElement";

function ComputerList(props) {
    return (
        <div className='dashboard'>
            <Table hover>
                <thead>
                <tr>
                    <td key='checkbox'>
                        <FormCheck
                            type='checkbox'
                        />
                    </td>
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
                        />
                    )
                })}
                </tbody>
            </Table>
            <style jsx>{`
              .heading {
                display: flex;
                justify-content: space-around;
              }
            `}</style>
        </div>
    )
}

export default ComputerList

ComputerList.propTypes = {
  computers: PropTypes.arrayOf(Object).isRequired,
  onComputerClick: PropTypes.func.isRequired
}