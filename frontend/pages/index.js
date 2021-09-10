import ComputerList from '/components/computer/computerTable/ComputerList'
import client from '/apollo-client'
import React, {useState} from 'react'
import style from '/styles/index.module.scss'
import ActiveComputer from '/components/computer/ActiveComputer'
import ComputersController from '/components/computer/computerTable/ComputersController'
import {getPCQuery} from '/gql_api/queries/getPC'
import {allPCQuery} from '/gql_api/queries/allPC'


function Index(props) {
    const [activeComputer, setActiveComputer] = useState(undefined)
    const [computers, setComputers] = useState(props.AllPC)

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
        client.query({
            query: allPCQuery,
            variables: {
                sorting: sorting,
                filter: filter,
                search: search,
            },
        }).then(response => setComputers(response.data.AllPC))
    }


    return (
        <div className={style.indexContainer}>
            <div className={style.computersContainer}>
                <ComputersController
                    updateTable={updateTable}
                />
                <ComputerList
                    onComputerClick={onComputerClick}
                    computers={computers}
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

export async function getStaticProps() {
    const {data} = await client.query({
        query: allPCQuery,
    })

    return {
        props: data,
    }
}