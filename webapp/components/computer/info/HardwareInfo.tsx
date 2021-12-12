import { Skeleton, Typography } from '@mui/material'
import { ComputerType, CPU, OS, Videocard } from 'api/generated/graphql'
import { BaseProps, defaultNoDataMessage, skeletonText } from 'components/shared/defaults'
import Image from 'next/image'
import React from 'react'
import { BsDisplayFill } from 'react-icons/bs'
import { FaMemory } from 'react-icons/fa'
import { RiCpuLine, RiWindowsFill } from 'react-icons/ri'

export interface MemProps extends BaseProps {
    memoryAmount: number
    memoryUnit: 'MB' | 'GB' | 'KB'
}

const Info = ({ children }) => <Typography marginTop='10px'>{children}</Typography>

export function MemoryInfo(props: MemProps) {
    let content
    if (props.loading) {
        content = skeletonText
    } else if (props.memoryAmount) {
        content = ` ${props.memoryAmount} ${props.memoryUnit}`
    } else {
        content = defaultNoDataMessage
    }
    return <Info><FaMemory/> {content}</Info>
}

export interface OSProps extends BaseProps {
    os: OS | null
}

export function OSInfo(props: OSProps) {
    let content: JSX.Element | string
    if (props.loading) {
        content = skeletonText
    } else if (props.os.name) {
        content = `${props.os.name}`
        props.os.architecture ? content += `, ${props.os.architecture}` : null
    } else {
        content = defaultNoDataMessage
    }
    return <Info><RiWindowsFill/> {content}</Info>
}

export interface CPUProps extends BaseProps {
    cpu: CPU
}

export function CpuInfo(props: CPUProps) {
    let content: JSX.Element | string
    if (props.loading) {
        content = skeletonText
    } else if (props.cpu.name) {
        content = <>
            {props.cpu.name}<br/>
            Clock: {props.cpu.clock} MHz<br/>
            Cores/Threads: {props.cpu.cores}/{props.cpu.threads}<br/>
        </>
    } else {
        content = defaultNoDataMessage
    }
    return <Info><RiCpuLine/> {content}</Info>
}

export interface VCProps extends BaseProps {
    videocard: Videocard
}

export function VideocardInfo(props: VCProps) {
    let content: JSX.Element | string
    if (props.loading) {
        content = skeletonText
    } else if (props.videocard.name) {
        content = `${props.videocard.name}, ${props.videocard.memory} GB`
    } else {
        content = defaultNoDataMessage
    }
    return <Info><BsDisplayFill/> {content}</Info>
}

export interface TypeProps extends BaseProps {
    type: ComputerType
}

export function TypeIdentifier(props: TypeProps) {
    const dimensionProps = { width: 160, height: 100 }
    if (props.loading) {
        return <Skeleton variant='rectangular' {...dimensionProps}/>
    }
    switch (props.type) {
        case ComputerType.DESKTOP:
            return <Image src='/img/computer.png' {...dimensionProps}/>
        case ComputerType.LAPTOP:
            return <Image src='/img/laptop.png' {...dimensionProps}/>
    }
}