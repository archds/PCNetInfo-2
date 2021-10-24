import style from '/styles/ActiveComputer.module.scss'
import { useQuery } from '@apollo/client'
import CommonInfo from 'components/computer/actions_dashboard/computer_info/CommonInfo'
import { skeletonText } from 'components/computer/actions_dashboard/computer_info/defaults'
import {
    CpuInfo,
    MemoryInfo,
    OSInfo,
    TypeIdentifier,
    VideocardInfo,
} from 'components/computer/actions_dashboard/computer_info/HardwareInfo'
import { Computer, ComputerVariables } from 'components/shared/types/computers'
import { computerQuery } from 'gql_api/queries/computer'
import React from 'react'
import { GrClose } from 'react-icons/gr'

export interface Props {
    computerId: string
    resetActiveComputer(): void
}

function ActiveComputer(props: Props) {
    const { loading, data: computerData } = useQuery<{ computer: Computer }, ComputerVariables>(
        computerQuery,
        { variables: { id: props.computerId } },
    )

    const os = loading ? null : computerData.computer.os
    const ram = loading ? null : computerData.computer.ram
    const cpu = loading ? null : computerData.computer.cpu
    const videocard = loading ? null : computerData.computer.videocard
    const type = loading ? null : computerData.computer.type

    return (
        <>
            <GrClose className='closeButton' onClick={props.resetActiveComputer}/>
            <div className={style.activeComputer}>
                <div className={style.computerMainInfo}>
                    <div className={style.computerHardwareInfo}>
                        <div className={style.computerName}>
                            <TypeIdentifier type={type} loading={loading}/>
                            <p className='text-center'>{loading ? skeletonText : computerData.computer.name}</p>
                        </div>
                        <div>
                            <OSInfo os={os} loading={loading}/>
                            <CpuInfo cpu={cpu} loading={loading}/>
                            <MemoryInfo memoryAmount={ram} memoryUnit='GB' loading={loading}/>
                            <VideocardInfo videocard={videocard} loading={loading}/>
                        </div>
                    </div>
                    <div className={style.computerCommonInfo}>
                        <h3>{loading ? skeletonText : computerData.computer.label}</h3>
                        <CommonInfo
                            id={loading ? null : computerData.computer.id}
                            name={loading ? null : computerData.computer.name}
                            user={loading ? null : computerData.computer.user}
                            location={loading ? null : computerData.computer.location}
                            formFactor={loading ? null : computerData.computer.formFactor}
                            username={loading ? null : computerData.computer.username}
                            serial={loading ? null : computerData.computer.serial}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveComputer
