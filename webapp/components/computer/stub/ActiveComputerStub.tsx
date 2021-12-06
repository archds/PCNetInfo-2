import style from '/components/computer/stub/ActiveComputerStub.module.scss'
import { Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ReactFitText from 'react-fittext'
import Clock from 'react-live-clock'

function ActiveComputerStub() {
    return (
        <div className={style.ActiveComputerStubContainer}>
            <ReactFitText compressor={0.5}>
                <Typography variant='h1' align='center' fontWeight={700}>
                    <Clock format={'HH:mm:ss'} ticking={true}/>
                </Typography>
            </ReactFitText>
            <Image
                src='/img/love.svg'
                width={500}
                height={500}
            />
        </div>
    )
}

export default ActiveComputerStub