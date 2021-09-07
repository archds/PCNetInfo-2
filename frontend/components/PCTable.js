import {FormCheck, Table} from 'react-bootstrap'
import React from 'react'

export default class PCTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                    {this.props.itemList.map(item => {
                        return (
                            <tr key={item.name}>
                                <td key='checkbox'>
                                    <FormCheck
                                        type='checkbox'
                                    />
                                </td>
                                <td>{item.type}</td>
                                <td><a onClick={e => this.props.handler(item.name, e)}>{item.label}</a></td>
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
}