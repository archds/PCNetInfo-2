import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ReactFitText from 'react-fittext'
import Clock from 'react-live-clock'

function ActiveComputerStub() {
    return (
        <Box display='flex' flexDirection='column'>
            <ReactFitText compressor={0.5}>
                <Typography variant='h1' align='center' fontWeight={700} color='secondary'>
                    <Clock format={'HH:mm:ss'} ticking={true} />
                </Typography>
            </ReactFitText>
            <Image src='/img/love.svg' width={500} height={500} />
        </Box>
    )
}

export default ActiveComputerStub
