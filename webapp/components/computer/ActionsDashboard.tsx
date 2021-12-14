import ActiveComputer from 'components/computer/ActiveComputer'
import ComputerInput from 'components/computer/ComputerInput'
import ActiveComputerStub from 'components/computer/ActiveComputerStub'
import React from 'react'

export interface Props {
    input: boolean
    computerId: string
    resetActionsDashboard(): void
}

function ActionsDashboard(props: Props) {
    if (props.input) {
        return <ComputerInput resetComputerInput={props.resetActionsDashboard} />
    }
    if (props.computerId) {
        return <ActiveComputer computerId={props.computerId} resetActiveComputer={props.resetActionsDashboard} />
    }
    return <ActiveComputerStub />
}

export default ActionsDashboard
