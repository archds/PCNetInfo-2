import {gql} from '@apollo/client'
import {Container, Row} from 'react-bootstrap'
import PCTable from '../components/PCTable'
import client from '../apollo-client'
import React from 'react'
import PCDetail from '../components/PCDetail'


export default class mainPage extends React.Component {
    state = {
        activePC: {
            name: undefined
        }
    }

    constructor(props) {
        super(props)
        this.AllPC = props.AllPC
        this.pcHandler = this.pcHandler.bind(this)
    }

    pcHandler(pcName) {
        const data = getPC(pcName)

        data.then((pc) => {
            this.setState({
                activePC: {
                    name: pcName,
                    formFactor: pc.getPC.form_factor
                }
            })
        })
    }

    render() {
        return (
            <>
                <Container fluid={true}>
                    <Row>
                        <div className="dashboard pcDashboard">
                            <PCTable
                                handler={this.pcHandler}
                                itemList={this.AllPC}
                            />
                        </div>
                        <div className="dashboard pcDetail">
                            <PCDetail name={this.state.activePC.name} formFactor={this.state.activePC.formFactor}/>
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
}

async function getPC(pcName) {
    const {data} = await client.query({
        query: gql`
            query ($name: String!){
                getPC(name: $name) {
                    name
                    form_factor
                }
            }
        `,
        variables: {
            name: pcName
        }
    })
    return data
}

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