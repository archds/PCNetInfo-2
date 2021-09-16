import style from '/styles/ActionsDashboard.module.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import ActiveComputer from './ActiveComputer'
import ActiveComputerStub from './ActiveComputerStub'
import ComputerInput from './ComputerInput'


function ActionsDashboard(props) {
    const dashboardClass = classNames('dashboard', style.actionsDashboard)

    if (props.input) {
        return <div className={dashboardClass}>
            <ComputerInput
                resetComputerInput={props.resetActionsDashboard}
            />
        </div>
    }
    if (props.computerName) {
        return (
            <div className={dashboardClass}>
                <ActiveComputer computerName={props.computerName} resetActiveComputer={props.resetActionsDashboard}/>
            </div>
        )
    }
    return <div className={dashboardClass}><ActiveComputerStub/></div>
}

export default ActionsDashboard

ActionsDashboard.propTypes = {
    input: PropTypes.bool,
    computerName: PropTypes.string,
    resetActionsDashboard: PropTypes.func.isRequired,
}