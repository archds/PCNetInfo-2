import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import { RiDeleteBin6Line } from 'react-icons/ri'
import style from '/styles/ComputersDashboard.module.scss'

function ComputerActions(props) {
    return (
        <div className={style.computerActions}>
            {
                props.show ?
                    <Button
                        variant='outline-danger'
                        className='iconButton'
                        onClick={props.onDelete}
                    >
                        <RiDeleteBin6Line/>
                    </Button> : null
            }
        </div>
    )
}

export default ComputerActions

ComputerActions.propTypes = {
    onDelete: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
}