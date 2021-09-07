import React from 'react'
import ReactFitText from 'react-fittext'
import Clock from 'react-live-clock'
import {Image} from 'react-bootstrap'

export default class PCDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        if (this.props.name === undefined) {
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
        } else {
            return (
                <>
                    <p>{this.props.name}</p>
                    <p>{this.props.formFactor}</p>
                </>
            )
        }

    }
}