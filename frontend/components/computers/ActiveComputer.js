import PropTypes from 'prop-types'
import React from 'react'
import ActiveComputerStub from '../ActiveComputerStub'
import {GrClose} from 'react-icons/gr'

function ActiveComputer(props) {
    if (props.computer === undefined) {
        return (
            <div className='dashboard' style={{gridArea: 'active'}}>
                <ActiveComputerStub/>
            </div>
        )
    }

    return (
        <div className='dashboard' style={{paddingTop: 20}}>
            <GrClose style={{float: 'right'}} onClick={props.resetActiveComputer}/>
            <p>{props.computer.name}</p>
            <p>{props.computer.os.name}, {props.computer.os.architecture}</p>
        </div>
    )
}

export default ActiveComputer

ActiveComputer.propTypes = {
    computer: PropTypes.object,
    resetActiveComputer: PropTypes.func
}