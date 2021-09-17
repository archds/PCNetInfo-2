import PropTypes from 'prop-types'
import React from 'react'
import { GrClose } from 'react-icons/gr'

export interface Props {
    resetComputerInput(): void
}

function ComputerInput(props:Props) {
    const formStyle = {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
    }

    return (
        <>
            <GrClose className='closeButton' onClick={props.resetComputerInput}/>
        </>
    )
}

export default ComputerInput
