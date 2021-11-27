import style from '/components/computer/actions/ActionsDashboard.module.scss'
import classNames from 'classnames'
import React from 'react'
import ActiveComputer from 'components/computer/active/ActiveComputer'
import ActiveComputerStub from 'components/computer/stub/ActiveComputerStub'
import ComputerInput from 'components/computer/ComputerInput'

export interface Props {
    input: boolean,
    computerId: string,
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
    if (props.computerId) {
        return (
            <div className={dashboardClass}>
                <ActiveComputer computerId={props.computerId} resetActiveComputer={props.resetActionsDashboard}/>
            </div>
        )
    }
    return <div className={dashboardClass}><ActiveComputerStub/></div>
}

export default ActionsDashboard
