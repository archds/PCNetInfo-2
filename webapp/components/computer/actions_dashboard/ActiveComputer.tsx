import style from '/styles/ActiveComputer.module.scss'
import { useQuery } from '@apollo/client'
import CommonInfo from 'components/computer/actions_dashboard/computer_info/CommonInfo'
import CpuInfo from 'components/computer/actions_dashboard/computer_info/CPUInfo'
import { skeletonText } from 'components/computer/actions_dashboard/computer_info/defaults'
import MemoryInfo from 'components/computer/actions_dashboard/computer_info/MemoryInfo'
import OSInfo from 'components/computer/actions_dashboard/computer_info/OSInfo'
import TypeIdentifier from 'components/computer/actions_dashboard/computer_info/TypeIdentifier'
import VideocardInfo from 'components/computer/actions_dashboard/computer_info/VideocardInfo'
import { Computer, ComputerVariables } from 'components/shared/types/computers'
import { getPCQuery } from 'gql_api/queries/getPC'
import React from 'react'
import { GrClose } from 'react-icons/gr'

export interface Props {
    computerName: string
    resetActiveComputer(): void
}

function ActiveComputer(props: Props) {
    const { loading, data: computerData } = useQuery<{ getPC: Computer }, ComputerVariables>(
        getPCQuery,
        { variables: { name: props.computerName } },
    )

    const os = loading ? null : computerData.getPC.os
    const ram = loading ? null : computerData.getPC.ram
    const cpu = loading ? null : computerData.getPC.cpu
    const videocard = loading ? null : computerData.getPC.videocard
    const type = loading ? null : computerData.getPC.type

    return (
        <>
            <GrClose className='closeButton' onClick={props.resetActiveComputer}/>
            <div className={style.activeComputer}>
                <div className={style.computerMainInfo}>
                    <div className={style.computerHardwareInfo}>
                        <div className={style.computerName}>
                            <TypeIdentifier type={type} loading={loading}/>
                            <p className='text-center'>{loading ? skeletonText : computerData.getPC.name}</p>
                        </div>
                        <div>
                            <OSInfo os={os} loading={loading}/>
                            <CpuInfo cpu={cpu} loading={loading}/>
                            <MemoryInfo memoryAmount={ram} memoryUnit='GB' loading={loading}/>
                            <VideocardInfo videocard={videocard} loading={loading}/>
                        </div>
                    </div>
                    <div className={style.computerCommonInfo}>
                        <h3>{loading ? skeletonText : computerData.getPC.label}</h3>
                        <CommonInfo
                            name={loading ? null : computerData.getPC.name}
                            user={loading ? null : computerData.getPC.user}
                            location={loading ? null : computerData.getPC.location}
                            formFactor={loading ? null : computerData.getPC.formFactor}
                            username={loading ? null : computerData.getPC.username}
                            serial={loading ? null : computerData.getPC.serial}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveComputer
