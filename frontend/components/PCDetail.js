import React, {useState} from 'react'
import ReactFitText from 'react-fittext'
import Clock from 'react-live-clock'
import {Image} from 'react-bootstrap'

function PCDetail(props) {
    console.log(props)
    return (
        <>
            <ReactFitText compressor={0.5}>
                <h1 style={{textAlign: 'center'}}>
                    <Clock format={'HH:mm:ss'} ticking={true}/>
                </h1>
            </ReactFitText>
            <Image
                src='/img/love.svg'
                width={'100%'}
            />
        </>
    )
}

export default PCDetail