import {FormCheck, Table} from 'react-bootstrap'
import React from 'react'

function ComputerList(props) {
    return (
        <>
            <Table hover>
                <thead>
                <tr>
                    <td key='checkbox'>
                        <FormCheck
                            type='checkbox'
                        />
                    </td>
                    <th>Type</th>
                    <th>Label</th>
                    <th>Inventory number</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {props.computers.map(item => {
                    return (
                        <tr key={item.name}>
                            <td key='checkbox'>
                                <FormCheck
                                    type='checkbox'
                                />
                            </td>
                            <td>{item.type}</td>
                            <td><a onClick={e => props.handler(item.name, e)}>{item.label}</a></td>
                            <td>{item.serial}</td>
                            <td>{item.location}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <style jsx>{`
              .heading {
                display: flex;
                justify-content: space-around;
              }
            `}</style>
        </>
    )
}

export default ComputerList
