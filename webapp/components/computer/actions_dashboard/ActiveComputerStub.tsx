import style from '/styles/ActiveComputerStub.module.scss'
import Image from 'next/image'
import React from 'react'
import ReactFitText from 'react-fittext'
import Clock from 'react-live-clock'

function ActiveComputerStub() {
    return (
        <div className={style.ActiveComputerStubContainer}>
            <ReactFitText compressor={0.5}>
                <h1 style={{ textAlign: 'center' }}>
                    <Clock format={'HH:mm:ss'} ticking={true}/>
                </h1>
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