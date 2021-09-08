import {gql} from '@apollo/client'
import {Container, Row} from 'react-bootstrap'
import ComputerList from '../components/computer/ComputerList'
import client from '../apollo-client'
import React, {useState} from 'react'
import PCDetail from '../components/PCDetail'


function Index(props) {
    const [activeComputer, setActiveComputer] = useState(undefined)

    function pcHandler(pcName) {
        client.query({
            query: gql`
                query ($name: String!) {
                    getPC(name: $name) {
                        name
                        form_factor
                        ip
                        domain
                    }
                }
            `,
            variables: {
                name: pcName
            }
        }).then(data => {
            setActivePC(data.getPC)
        })
    }

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <div className="dashboard pcDashboard">
                        <ComputerList
                            handler={pcHandler}
                            computers={props.AllPC}
                        />
                    </div>
                    <div className="dashboard pcDetail">
                        {/*<PCDetail pc={activePC}/>*/}
                    </div>
                </Row>
            </Container>

            <style jsx>{`
              .dashboard {
                margin-left: 20px;
                padding: 1px 20px 20px 20px;
                border-radius: 20px;
                background: white;
                margin-top: 20px;
              }

              .pcDashboard {
                max-width: 65%;
              }

              .pcDetail {
                max-width: 30%;
                display: flex;
                flex-flow: column wrap;
                justify-content: space-around;
              }
            `}</style>
        </>
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
        props: data
    }
}