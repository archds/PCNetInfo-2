import style from '/pages/index.module.scss'
import ActionsDashboard from 'components/computer/actions/ActionsDashboard'
import ComputersDashboard from 'components/computer/ComputersDashboard'
import React, { useState } from 'react'


function Index() {
    const [activeComputer, setActiveComputer] = useState<string | undefined>(undefined)
    const [inputMode, setInputMode] = useState<boolean>(false)

    const resetActionsDashboard = (): void => {
        setActiveComputer(undefined)
        setInputMode(false)
    }

    const onComputerClick = (computerId: string): void => {
        setActiveComputer(computerId)
        setInputMode(false)
    }


    return (
        <>
            <div className={style.indexContainer}>

                <ComputersDashboard
                    onComputerClick={onComputerClick}
                    onAddComputer={() => setInputMode(true)}
                />
                <ActionsDashboard
                    resetActionsDashboard={resetActionsDashboard}
                    computerId={activeComputer}
                    input={inputMode}
                />

            </div>
        </>
    )
}

export default Index
