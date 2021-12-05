import style from '/components/computer/active/ActiveComputer.module.scss'
import { useComputerQuery } from 'api/generated/graphql'
import CommonInfo from 'components/computer/info/common/CommonInfo'
import { CpuInfo, MemoryInfo, OSInfo, TypeIdentifier, VideocardInfo } from 'components/computer/info/HardwareInfo'
import { skeletonText } from 'components/shared/defaults'
import React from 'react'
import { GrClose } from 'react-icons/gr'

export interface Props {
    computerId: string
    resetActiveComputer(): void
}

function ActiveComputer(props: Props) {
    const { loading, data: computerData } = useComputerQuery({ variables: { id: props.computerId } })

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
                            // user={loading ? null : computerData.computer.user}
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
