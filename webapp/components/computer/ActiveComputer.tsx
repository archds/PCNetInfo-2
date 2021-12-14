import { useComputerQuery } from 'api/generated/graphql'
import CommonInfo from 'components/computer/info/common/CommonInfo'
import { CpuInfo, MemoryInfo, OSInfo, TypeIdentifier, VideocardInfo } from 'components/computer/info/HardwareInfo'
import { skeletonText } from 'components/shared/defaults'
import React from 'react'
import { GrClose } from 'react-icons/gr'
import { Box, Typography } from '@mui/material'

export interface Props {
    computerId: string
    resetActiveComputer(): void
}

function ActiveComputer(props: Props) {
    const { loading, data } = useComputerQuery({ variables: { id: props.computerId } })

    const os = loading ? null : data.computer.os
    const ram = loading ? null : data.computer.ram
    const cpu = loading ? null : data.computer.cpu
    const videocard = loading ? null : data.computer.videocard
    const type = loading ? null : data.computer.type

    return (
        <>
            <GrClose className='closeButton' onClick={props.resetActiveComputer} />
            <Box display='grid' gridTemplateRows='auto auto'>
                <Box display='grid' padding='20px' gridTemplateColumns='1.2fr 2fr' gap='40px'>
                    <Box display='grid' gridTemplateRows='auto auto'>
                        <Box display='flex' flexDirection='column' alignItems='center' gap='20px'>
                            <TypeIdentifier type={type} loading={loading} />
                            <Typography fontWeight='bold' variant='h6' color='secondary'>
                                {loading ? skeletonText : data.computer.name}
                            </Typography>
                        </Box>
                        <Box>
                            <OSInfo os={os} loading={loading} />
                            <CpuInfo cpu={cpu} loading={loading} />
                            <MemoryInfo memoryAmount={ram} memoryUnit='GB' loading={loading} />
                            <VideocardInfo videocard={videocard} loading={loading} />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant='h3'>{loading ? skeletonText : data.computer.label}</Typography>
                        <CommonInfo
                            id={loading ? null : data.computer.id}
                            name={loading ? null : data.computer.name}
                            // user={loading ? null : data.computer.user}
                            location={loading ? null : data.computer.location}
                            formFactor={loading ? null : data.computer.formFactor}
                            username={loading ? null : data.computer.username}
                            serial={loading ? null : data.computer.serial}
                            loading={loading}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ActiveComputer
