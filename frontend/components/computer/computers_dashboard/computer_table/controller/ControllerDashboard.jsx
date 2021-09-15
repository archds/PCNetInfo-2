import PropTypes from 'prop-types'
import React from 'react'
import style from '/styles/ComputersDashboard.module.scss'
import ComputerActions from './ComputerActions'
import TableController from './TableController'

function ControllerDashboard(props) {
    const onControllerChange = (sorting, filter, search) => {
        props.onControllerChange(sorting, filter, search)
    }

    return (
        <div className='dashboard'>
            <div className={style.controllerContainer}>
                <TableController onControllerChange={onControllerChange}/>
                <ComputerActions onDelete={props.onDelete} show={props.showActions}/>
            </div>
        </div>
    )
}

export default ControllerDashboard

ControllerDashboard.propTypes = {
  onControllerChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
}