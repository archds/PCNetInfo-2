import { Skeleton } from '@material-ui/lab'
import {
    BaseProps,
    defaultNoDataMessage,
    skeletonText,
} from 'components/computer/actions_dashboard/computer_info/defaults'
import { ComputerType } from 'components/shared/enums'
import { CPU, OS, Videocard } from 'components/shared/types/computers'
import Image from 'next/image'
import React from 'react'
import { BsDisplayFill } from 'react-icons/bs'
import { FaMemory } from 'react-icons/fa'
import { RiCpuLine, RiWindowsFill } from 'react-icons/ri'

export interface MemProps extends BaseProps {
    memoryAmount: number
    memoryUnit: 'MB' | 'GB' | 'KB'
}

export function MemoryInfo(props: MemProps) {
    let content
    if (props.loading) {
        content = skeletonText
    } else if (props.memoryAmount) {
        content = ` ${props.memoryAmount} ${props.memoryUnit}`
    } else {
        content = defaultNoDataMessage
    }
    return <p><FaMemory/>{content}</p>
}

export interface OSProps extends BaseProps {
    os: OS | null
}

export function OSInfo(props: OSProps) {
    let content
    if (props.loading) {
        content = skeletonText
    } else if (props.os) {
        content = `${props.os.name}, ${props.os.architecture}`
    } else {
        content = defaultNoDataMessage
    }
    return <p><RiWindowsFill/> {content}</p>
}

export interface CPUProps extends BaseProps {
    cpu: CPU
}

export function CpuInfo(props: CPUProps) {
    let content
    if (props.loading) {
        content = skeletonText
    } else if (props.cpu) {
        content = ` ${props.cpu.name}\n
            Clock: ${props.cpu.clock} MHz\n
            Cores/Threads: ${props.cpu.cores}/${props.cpu.threads}`
    } else {
        content = defaultNoDataMessage
    }
    return <p><RiCpuLine/> {content}</p>
}

export interface VCProps extends BaseProps {
    videocard: Videocard
}

export function VideocardInfo(props: VCProps) {
    let content
    if (props.loading) {
        content = skeletonText
    } else if (props.videocard) {
        content = `${props.videocard.name}, ${props.videocard.memory} GB`
    } else {
        content = defaultNoDataMessage
    }
    return <p><BsDisplayFill/> {content}</p>
}

export interface TypeProps extends BaseProps {
    type: ComputerType
}

export function TypeIdentifier(props: TypeProps) {
    const dimensionProps = { width: 160, height: 100 }
    if (props.loading) {
        return <Skeleton variant='rect' {...dimensionProps}/>
    }
    switch (props.type) {
        case ComputerType.DESKTOP:
            return <Image src='/img/computer.png' {...dimensionProps}/>
        case ComputerType.LAPTOP:
            return <Image src='/img/laptop.png' {...dimensionProps}/>
    }
}