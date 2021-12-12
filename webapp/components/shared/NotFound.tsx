import HelpIcon from '@mui/icons-material/Help'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import copy from 'copy-to-clipboard'
import Image from 'next/image'
import React, { useState } from 'react'

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
        setTimeout(() => setTooltipTitle(props.helpMessage), 1000)
    }

    const tooltip = (
        <Tooltip title={tooltipTitle} placement='top'>
            <IconButton onClick={handleCopy} size='large'>
                <HelpIcon color='primary' fontSize='medium'/>
            </IconButton>
        </Tooltip>
    )

    return (
        <Box>
            <Image src='/img/not_found.svg' width={1200} height={500}/>
            <Typography variant='h5' color='secondary' marginTop='20px' align='center'>
                {props.message}
                {props.helpMessage ? tooltip : null}
            </Typography>
        </Box>
    )
}

export default NotFound