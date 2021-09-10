import ComputerList from '/components/computer/computerTable/ComputerList'
import client from '/apollo-client'
import React, {useState} from 'react'
import style from '/styles/index.module.scss'
import ActiveComputer from '/components/computer/ActiveComputer'
import ComputersController from '/components/computer/computerTable/ComputersController'
import {getPCQuery} from '/gql_api/queries/getPC'
import {allPCQuery} from '/gql_api/queries/allPC'
import {useQuery} from '@apollo/client'


function Index(props) {
    const [activeComputer, setActiveComputer] = useState(undefined)
    const {data, error, loading, refetch} = useQuery(allPCQuery)

    if (loading) {
        return <div className={style.loadingContainer}>
            <div className={style.ldsDualRing}></div>
        </div>
    }

    const resetActiveComputer = () => {
        setActiveComputer(undefined)
    }

    const onComputerClick = (pcName, e) => {
        e.preventDefault()
        client.query({
            query: getPCQuery,
            variables: {
                name: pcName,
            },
        }).then(response => {
            let computerData = response.data.getPC
            setActiveComputer(computerData)
        })
    }

    const updateTable = (sorting, filter, search) => {
        refetch({
            sorting: sorting,
            filter: filter,
            search: search,
        })
    }


    return (
        <div className={style.indexContainer}>
            <div className={style.computersContainer}>
                <ComputersController
                    updateTable={updateTable}
                />
                <ComputerList
                    onComputerClick={onComputerClick}
                    computers={data.AllPC}
                />
            </div>
            <ActiveComputer
                computer={activeComputer}
                resetActiveComputer={resetActiveComputer}
            />
        </div>
    )
}

export default Index
