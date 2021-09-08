import React from 'react'
import {FormCheck} from 'react-bootstrap'
import PropTypes from 'prop-types'

function ComputerElement(props) {
    return (
        <tr key={props.pc.name}>
            <td key='checkbox'>
                <FormCheck
                    type='checkbox'
                />
            </td>
            <td>{props.pc.type}</td>
            <td><a href='' onClick={e => props.onComputerClick(props.pc.name, e)}>{props.pc.label}</a></td>
            <td>{props.pc.serial}</td>
            <td>{props.pc.location}</td>
        </tr>
    )
}

export default ComputerElement

ComputerElement.propTypes = {
  onComputerClick: PropTypes.func,
  pc: PropTypes.object
}