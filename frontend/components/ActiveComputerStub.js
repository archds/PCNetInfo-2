import React from 'react'
import ReactFitText from 'react-fittext'
import Clock from 'react-live-clock'
import {Image} from 'react-bootstrap'
import style from '../styles/ActiveComputerStub.module.scss'

function ActiveComputerStub(props) {
    return (
        <div className={style.ActiveComputerStubContainer}>
            <ReactFitText compressor={0.5}>
                <h1 style={{textAlign: 'center'}}>
                    <Clock format={'HH:mm:ss'} ticking={true}/>
                </h1>
            </ReactFitText>
            <Image
                src='/img/love.svg'
                width={'100%'}
            />
        </div>
    )
}

export default ActiveComputerStub