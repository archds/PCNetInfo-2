import PropTypes from 'prop-types'
import React from 'react'
import {Button, Modal} from 'react-bootstrap'

function ModalConfirm(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.modalBody}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" className='text-light' onClick={props.handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm

ModalConfirm.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    modalBody: PropTypes.string,
    modalHeading: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
}