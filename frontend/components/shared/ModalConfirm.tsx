import PropTypes from 'prop-types'
import React from 'react'

function ModalConfirm(props) {
    return (
        <div></div>
        // <Modal open={props.show}>
        //     <h1>{props.modalHeading}</h1>
        //     <p>{props.modalBody}</p>
        //     <Button variant='secondary' onClick={props.handleClose}>
        //         Cancel
        //     </Button>
        //     <Button variant='primary' className='text-light' onClick={props.handleConfirm}>
        //         Confirm
        //     </Button>
        // </Modal>
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