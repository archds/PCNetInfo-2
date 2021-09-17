import style from '/styles/ActiveComputer.module.scss'
import { useQuery } from '@apollo/client'
import Loading from 'components/shared/components/Loading'
import { Computer, ComputerVariables } from 'components/shared/types/computers'
import { getPCQuery } from 'gql_api/queries/getPC'
import Image from 'next/image'
import React from 'react'
import { BsDisplayFill } from 'react-icons/bs'
import { FaMemory } from 'react-icons/fa'
import { GoCircuitBoard } from 'react-icons/go'
import { GrClose } from 'react-icons/gr'
import { MdEdit } from 'react-icons/md'
import { RiCpuLine, RiWindowsFill } from 'react-icons/ri'

export interface Props {
    computerName: string

    resetActiveComputer(): void
}

function ActiveComputer(props: Props) {
    const {
        loading: computerLoading,
        data: computer,
    } = useQuery<Computer, ComputerVariables>(
        getPCQuery,
        {
            variables: {
                name: props.computerName,
            },
        },
    )

    if (computerLoading) {
        return <Loading/>
    }

    const editBtn = <MdEdit className={style.edit}/>
    const iconPdg = <span className={style.iconPadding}></span>

    const computerCommonInfo = Object.entries({
        'User:': computer.user,
        'Location:': computer.location,
        'Form factor:': computer.form_factor,
        'Domain:': computer.domain,
        'IP address:': computer.ip,
        'Username:': computer.username,
        'Timezone:': computer.timezone,
        'Serial number:': computer.serial,
    }).map(([key, value]) => {
        return <p key={key.replace(':', '')}><b>{key} </b> <span>{editBtn} {value}</span></p>
    })

    const computerOSInfo = (
        <p>
            <RiWindowsFill/> {computer.os.name}, x{computer.os.architecture}<br/>
            {iconPdg}ver. {computer.os.version}
        </p>
    )

    const computerRAMInfo = <p><FaMemory/> {computer.ram.size} GB</p>
    const computerCPUInfo = (
        <p>
            <RiCpuLine/> {computer.cpu.name}<br/>
            {iconPdg}Clock: {computer.cpu.clock} MHz<br/>
            {iconPdg}Cores/Threads: {computer.cpu.cores}/{computer.cpu.threads}<br/>
            {iconPdg}Socket: {computer.cpu.socket.replace('SOCKET', '')}
        </p>
    )

    return (
        <>
            <GrClose className='closeButton' onClick={props.resetActiveComputer}/>
            <div className={style.activeComputer}>
                <div className={style.computerMainInfo}>
                    <div className={style.computerHardwareInfo}>
                        <div className={style.computerName}>
                            <Image src='/img/computer.png' width='100%' height='100%'/>
                            <p className='text-center'>{computer.name}</p>
                        </div>
                        <div>
                            {computerOSInfo}
                            {computerCPUInfo}
                            {computerRAMInfo}
                            <p>
                                <GoCircuitBoard/>
                                {computer.motherboard.manufacturer},
                                {computer.motherboard.product},
                                {computer.motherboard.serial},
                            </p>
                            <p>
                                <BsDisplayFill/>
                                {computer.videocard.name},
                                {computer.videocard.resX},
                                {computer.videocard.resY}
                            </p>
                        </div>
                    </div>
                    <div className={style.computerCommonInfo}>
                        <h3>{computer.label}</h3>
                        {computerCommonInfo}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveComputer
