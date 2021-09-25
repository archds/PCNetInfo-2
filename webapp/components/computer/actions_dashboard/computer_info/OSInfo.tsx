import {
    BaseProps,
    defaultNoDataMessage,
    skeletonText,
} from 'components/computer/actions_dashboard/computer_info/defaults'
import { OS } from 'components/shared/types/computers'
import React from 'react'
import { RiWindowsFill } from 'react-icons/ri'

export interface Props extends BaseProps {
    os: OS | null
}


function OSInfo(props: Props) {
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

export default OSInfo