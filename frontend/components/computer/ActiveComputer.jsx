import PropTypes from 'prop-types'
import React from 'react'
import ActiveComputerStub from './ActiveComputerStub'
import {GrClose} from 'react-icons/gr'
import style from '../../styles/ActiveComputer.module.scss'
import {Image} from 'react-bootstrap'
import {MdEdit} from 'react-icons/md'
import {RiCpuLine, RiWindowsFill} from 'react-icons/ri'
import {FaMemory} from 'react-icons/fa'
import {GoCircuitBoard} from 'react-icons/go'
import {BsDisplayFill} from 'react-icons/bs'

const computerTypes = {
    desktop: '/img/computer.png',
    laptop: '/img/laptop.png',
}

function ActiveComputer(props) {
    if (props.computer === undefined) {
        return (
            <div className={`dashboard ${style.activeComputerContainer}`}>
                <ActiveComputerStub/>
            </div>
        )
    }

    const editBtn = <MdEdit className={style.edit}/>
    const iconPdg = <span className={style.iconPadding}></span>

    const computerCommonInfo = Object.entries({
        // 'Label:': props.computer.label,
        'User:': props.computer.user,
        'Location:': props.computer.location,
        'Form factor:': props.computer.form_factor,
        'Domain:': props.computer.domain,
        'IP address:': props.computer.ip,
        'Username:': props.computer.username,
        'Timezone:': props.computer.timezone,
        'Serial number:': props.computer.serial,
    }).map(([key, value]) => {
        return <p key={key.replace(':', '')}><b>{key} </b> <span>{editBtn} {value}</span></p>
    })

    const computerOSInfo = (
        <p>
            <RiWindowsFill/> {props.computer.os.name}, x{props.computer.os.architecture}<br/>
            {iconPdg}ver. {props.computer.os.version}
        </p>
    )

    const computerRAMInfo = <p><FaMemory/> {props.computer.ram.size} GB</p>
    const computerCPUInfo = (
        <p>
            <RiCpuLine/> {props.computer.cpu.name}<br/>
            {iconPdg}Clock: {props.computer.cpu.clock} MHz<br/>
            {iconPdg}Cores/Threads: {props.computer.cpu.cores}/{props.computer.cpu.threads}<br/>
            {iconPdg}Socket: {props.computer.cpu.socket.replace('SOCKET', '')}
        </p>
    )

    return (
        <div
            className={`dashboard ${style.activeComputerContainer}`}
            style={{paddingTop: 20}}
        >
            <GrClose className={style.closeButton} onClick={props.resetActiveComputer}/>
            <div className={style.activeComputer}>
                <div className={style.computerMainInfo}>
                    <div className={style.computerHardwareInfo}>
                        <div className={style.computerName}>
                            <Image src='/img/computer.png' width='100%'/>
                            <p className='text-center'>{props.computer.name}</p>
                        </div>
                        <div>
                            {computerOSInfo}
                            {computerCPUInfo}
                            {computerRAMInfo}
                            <p>
                                <GoCircuitBoard/>
                                {props.computer.motherboard.manufacturer},
                                {props.computer.motherboard.product},
                                {props.computer.motherboard.serial},
                            </p>
                            <p>
                                <BsDisplayFill/>
                                {props.computer.videocard.name},
                                {props.computer.videocard.resX},
                                {props.computer.videocard.resY}
                            </p>
                        </div>
                    </div>
                    <div className={style.computerCommonInfo}>
                        <h3>{props.computer.label}</h3>
                        {computerCommonInfo}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ActiveComputer

ActiveComputer.propTypes = {
    computer: PropTypes.object,
    resetActiveComputer: PropTypes.func,
}