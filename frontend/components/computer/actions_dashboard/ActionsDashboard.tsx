import style from '/styles/ActionsDashboard.module.scss'
import classNames from 'classnames'
import React from 'react'
import ActiveComputer from './ActiveComputer'
import ActiveComputerStub from './ActiveComputerStub'
import ComputerInput from './ComputerInput'

export interface Props {
    input: boolean,
    computerName: string,
    resetActionsDashboard(): void
}

function ActionsDashboard(props: Props) {
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
