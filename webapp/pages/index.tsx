import style from '/styles/index.module.scss'
import { Snackbar } from '@material-ui/core'
import Alert, { Color } from '@material-ui/lab/Alert'
import { StateContext } from 'components/shared/interfaces'
import Head from 'next/head'
import React, { createContext, useState } from 'react'
import ActionsDashboard from '../components/computer/actions_dashboard/ActionsDashboard'
import ComputersDashboard from '../components/computer/computers_dashboard/ComputersDashboard'


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

    const onComputerClick = (pcName): void => {
        setActiveComputer(pcName)
        setInputMode(false)
    }

    const snackbarContextValue: StateContext = {
        state: snackbar,
        setState: setSnackbar,
    }


    return (
        <>
            <Head>
                <title>PC Net Info</title>
                <link rel='apple-touch-icon' sizes='180x180' href='/img/favicon/apple-touch-icon.png'/>
                <link rel='icon' type='image/png' sizes='32x32' href='/img/favicon/favicon-32x32.png'/>
                <link rel='icon' type='image/png' sizes='16x16' href='/img/favicon/favicon-16x16.png'/>
                <link rel='manifest' href='/img/favicon/safari-pinned-tab.svg'/>
                <link rel='mask-icon' href='/img/favicon/safari-pinned-tab.svg' color='#41b883'/>
                <link rel='shortcut icon' href='/img/favicon/favicon.ico'/>
                <meta name='msapplication-TileColor' content='#41b883'/>
                <meta name='msapplication-config' content='/img/favicon/browserconfig.xml'/>
                <meta name='theme-color' content='#ffffff'/>
            </Head>
            <div className={style.indexContainer}>
                <SnackbarContext.Provider value={snackbarContextValue}>
                    <ComputersDashboard
                        onComputerClick={onComputerClick}
                        onAddComputer={() => setInputMode(true)}
                    />
                    <ActionsDashboard
                        resetActionsDashboard={resetActionsDashboard}
                        computerName={activeComputer}
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
