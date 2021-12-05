import { IconButton, Tooltip } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import copy from 'copy-to-clipboard'
import Image from 'next/image'
import React, { useState } from 'react'
import style from './NotFound.module.scss'

export interface Props {
    message: string
    helpMessage?: string
    debugInfo?: string
}

function NotFound(props: Props) {
    const [tooltipTitle, setTooltipTitle] = useState(props.helpMessage)
    const handleCopy = () => {
        copy(props.debugInfo ? props.debugInfo : props.helpMessage)
        setTooltipTitle('Copied!')
        setTimeout(() => {setTooltipTitle(props.helpMessage)}, 1000)
    }

    const tooltip = (
        <Tooltip title={tooltipTitle} placement='top'>
            <IconButton onClick={handleCopy}>
                <HelpIcon color='primary' fontSize='medium'/>
            </IconButton>
        </Tooltip>
    )

    return (
        <div className={style.notFound}>
            <Image src='/img/not_found.svg' width={1200} height={500}/>
            <h4>
                {props.message}
                {props.helpMessage ? tooltip : null}
            </h4>
        </div>
    )
}

export default NotFound