import {
    BaseProps,
    defaultNoDataMessage,
    skeletonText,
} from 'components/computer/actions_dashboard/computer_info/defaults'
import { Videocard } from 'components/shared/types/computers'
import React from 'react'
import { BsDisplayFill } from 'react-icons/bs'

export interface Props extends BaseProps {
    videocard: Videocard
}

function VideocardInfo(props: Props) {
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

export default VideocardInfo
