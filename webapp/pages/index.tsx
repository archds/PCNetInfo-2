import style from '/pages/index.module.scss'
import { Snackbar } from '@material-ui/core'
import Alert, { Color } from '@material-ui/lab/Alert'
import ActionsDashboard from 'components/computer/actions/ActionsDashboard'
import ComputersDashboard from 'components/computer/ComputersDashboard'
import { StateContext } from 'core/interfaces'
import React, { createContext, useState } from 'react'


export interface SnackbarContextInterface {
    severity: Color
    message?: string
    show: boolean
}

export const SnackbarContext = createContext<StateContext>(null)

function Index() {
    const [activeComputer, setActiveComputer] = useState<string | undefined>(undefined)
    const [inputMode, setInputMode] = useState<boolean>(false)
    const [snackbar, setSnackbar] = useState<SnackbarContextInterface>({ severity: 'success', show: false })

    const resetActionsDashboard = (): void => {
        setActiveComputer(undefined)
        setInputMode(false)
    }

    const onComputerClick = (computerId: string): void => {
        setActiveComputer(computerId)
        setInputMode(false)
    }

    const snackbarContextValue: StateContext = {
        state: snackbar,
        setState: setSnackbar,
    }


    return (
        <>
            <div className={style.indexContainer}>
                <SnackbarContext.Provider value={snackbarContextValue}>
                    <ComputersDashboard
                        onComputerClick={onComputerClick}
                        onAddComputer={() => setInputMode(true)}
                    />
                    <ActionsDashboard
                        resetActionsDashboard={resetActionsDashboard}
                        computerId={activeComputer}
                        input={inputMode}
                    />
                </SnackbarContext.Provider>
            </div>
            <Snackbar
                open={snackbar.show}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ severity: 'success', show: false })}
            >
                <Alert variant='filled' severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}

export default Index
