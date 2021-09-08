import {gql} from '@apollo/client'
import ComputerList from '../components/computers/computerTable/ComputerList'
import client from '../apollo-client'
import React, {useState} from 'react'
import style from '../styles/index.module.scss'
import ActiveComputer from '../components/computers/ActiveComputer'

function Index(props) {
    const [activeComputer, setActiveComputer] = useState(undefined)
    const [computers, setComputers] = useState(props.AllPC)

    const resetActiveComputer = () => {
        setActiveComputer(undefined)
    }

    const onComputerClick = (pcName, e) => {
        e.preventDefault()
        client.query({
            query: gql`
                query ($name: String!) {
                    getPC(name: $name) {
                        name
                        form_factor
                        os {
                            name
                            version
                            architecture
                        }
                    }
                }
            `,
            variables: {
                name: pcName
            }
        }).then(response => {
            let computerData = response.data.getPC
            setActiveComputer(computerData)
        })
    }

    return (
        <div className={style.indexContainer}>
            <ComputerList
                onComputerClick={onComputerClick}
                computers={computers}
            />
            <ActiveComputer computer={activeComputer} resetActiveComputer={resetActiveComputer}/>
        </div>
    )
}

export default Index

export async function getStaticProps() {
    const {data} = await client.query({
        query: gql`
            query {
                AllPC {
                    name
                    type
                    label
                    serial
                    location
                }
            }
        `,
    })

    return {
        props: data,
    }
}