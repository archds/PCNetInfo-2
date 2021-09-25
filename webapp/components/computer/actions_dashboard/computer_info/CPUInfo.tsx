import {
    BaseProps,
    defaultNoDataMessage,
    skeletonText,
} from 'components/computer/actions_dashboard/computer_info/defaults'
import { CPU } from 'components/shared/types/computers'
import React from 'react'
import { RiCpuLine } from 'react-icons/ri'

export interface Props extends BaseProps {
    cpu: CPU
}

function CpuInfo(props: Props) {
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

export default CpuInfo