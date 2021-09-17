import style from '/styles/index.module.scss'
import Head from 'next/head'
import React, { useState } from 'react'
import ActionsDashboard from '../components/computer/actions_dashboard/ActionsDashboard'
import ComputersDashboard from "../components/computer/computers_dashboard/ComputersDashboard";

const enums = {
    computerType: {
        desktop: 'DESKTOP',
        laptop: 'LAPTOP',
    },
}

export const ComputersContext = React.createContext({
    enums: enums
})

function Index() {
    const [activeComputer, setActiveComputer] = useState(undefined)
    const [inputMode, setInputMode] = useState(false)

    const resetActionsDashboard = () => {
        setActiveComputer(undefined)
        setInputMode(false)
    }

    const onComputerClick = (pcName) => {
        setActiveComputer(pcName)
        setInputMode(false)
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
            <ComputersContext.Provider value={{ enums: enums }}>
                <div className={style.indexContainer}>
                    <ComputersDashboard
                        onComputerClick={onComputerClick}
                        onAddComputer={() => setInputMode(true)}
                    />
                    <ActionsDashboard
                        resetActionsDashboard={resetActionsDashboard}
                        computerName={activeComputer}
                        input={inputMode}
                    />
                </div>
            </ComputersContext.Provider>
        </>
    )
}

export default Index
