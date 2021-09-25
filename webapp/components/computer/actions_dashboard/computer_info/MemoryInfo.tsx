import {
    BaseProps,
    defaultNoDataMessage,
    skeletonText,
} from 'components/computer/actions_dashboard/computer_info/defaults'
import React from 'react'
import { FaMemory } from 'react-icons/fa'

export interface Props extends BaseProps {
    memoryAmount: number
    memoryUnit: 'MB' | 'GB' | 'KB'
}

function MemoryInfo(props: Props) {
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

export default MemoryInfo