import ComputersDashboard from '/components/computer/computers_dashboard/ComputersDashboard'
import style from '/styles/index.module.scss'
import { useQuery } from '@apollo/client'
import Head from 'next/head'
import React, { useState } from 'react'
import ActionsDashboard from '../components/computer/actions_dashboard/ActionsDashboard'
import { allPCQuery } from '../gql_api/queries/allPC'


function Index() {
    const [activeComputer, setActiveComputer] = useState(undefined)
    const {
        data: computers,
        error: computersError,
        loading: computersLoading,
        refetch: refetchComputers,
    } = useQuery(allPCQuery)
    const [inputMode, setInputMode] = useState(false)

    const resetActionsDashboard = () => {
        setActiveComputer(undefined)
        setInputMode(false)
    }

    const onComputerClick = (pcName, e) => {
        e.preventDefault()
        setActiveComputer(pcName)
        setInputMode(false)
    }

    const onControllerChange = (sorting, filter, search) => {
        refetchComputers({
            sorting: sorting,
            filter: filter,
            search: search,
        })
    }


    if (computersLoading) {
        return <div className={style.computersContainer}>
            <div className={style.ldsDualRing}></div>
        </div>
    }

    if (computersError) {
        console.error(computersError)
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
                <ComputersDashboard
                    onComputerClick={onComputerClick}
                    onDelete={refetchComputers}
                    onControllerChange={onControllerChange}
                    computers={computers.AllPC}
                />
                <ActionsDashboard
                    resetActiveComputer={resetActionsDashboard}
                    computerName={activeComputer}
                    input={inputMode}
                />
            </div>
        </>
    )
}

export default Index
