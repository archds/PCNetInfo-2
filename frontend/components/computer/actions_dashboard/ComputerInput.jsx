import PropTypes from 'prop-types'
import React from 'react'
import { GrClose } from 'react-icons/gr'

function ComputerInput(props) {
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

ComputerInput.propTypes = {
    resetComputerInput: PropTypes.func.isRequired,
}