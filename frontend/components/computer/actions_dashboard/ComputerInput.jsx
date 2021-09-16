import PropTypes from 'prop-types'
import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { BiLabel } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'
import style from 'styles/ComputerInput.module.scss'

function ComputerInput(props) {
    const formStyle = {
        display: 'flex',
        gap: 10,
        alignItems: 'center'
    }

    return (
        <>
            <GrClose className='closeButton' onClick={props.resetComputerInput}/>
            <div className={style.inputContainer}>
                <Form>
                    <InputGroup>
                        <InputGroup.Text><BiLabel/></InputGroup.Text>
                        <Form.Control type='text' placeholder='Label'/>
                    </InputGroup>
                </Form>
            </div>
        </>
    )
}

export default ComputerInput

ComputerInput.propTypes = {
  resetComputerInput: PropTypes.func.isRequired
}