import PropTypes from 'prop-types'
import React from 'react'
import ActiveComputerStub from './ActiveComputerStub'
import {GrClose} from 'react-icons/gr'
import style from '../../styles/ActiveComputer.module.scss'

function ActiveComputer(props) {
    if (props.computer === undefined) {
        return (
            <div className={`dashboard ${style.activeComputerContainer}`}>
                <ActiveComputerStub/>
            </div>
        )
    }

    return (
        <div
            className={`dashboard ${style.activeComputerContainer}`}
            style={{paddingTop: 20}}
        >
            <GrClose className={style.closeButton} onClick={props.resetActiveComputer}/>
            <p>{props.computer.name}</p>
            <p>{props.computer.type}</p>
            <p>{props.computer.form_factor}</p>
            <p>{props.computer.domain}</p>
            <p>{props.computer.username}</p>
            <p>{props.computer.timezone}</p>
            <p>{props.computer.serial}</p>
            <p>{props.computer.ip}</p>
            <p>{props.computer.comment}</p>
            <p>{props.computer.label}</p>
            <p>{props.computer.user}</p>
            <p>{props.computer.location}</p>
            <p>{props.computer.os.name}, {props.computer.os.version}, {props.computer.os.architecture}</p>
            <p>{props.computer.ram.size} GB</p>
            <p>
                {props.computer.cpu.name},
                {props.computer.cpu.clock},
                {props.computer.cpu.cores},
                {props.computer.cpu.threads},
                {props.computer.cpu.socket}
            </p>
            <p>
                {props.computer.motherboard.manufacturer},
                {props.computer.motherboard.product},
                {props.computer.motherboard.serial},
            </p>
            <p>
                {props.computer.videocard.name},
                {props.computer.videocard.resX},
                {props.computer.videocard.resY}
            </p>
        </div>
    )
}

export default ActiveComputer

ActiveComputer.propTypes = {
    computer: PropTypes.object,
    resetActiveComputer: PropTypes.func,
}