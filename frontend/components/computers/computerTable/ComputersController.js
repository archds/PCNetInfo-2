import React, {useState} from 'react'
import {Button, Dropdown} from 'react-bootstrap'
import style from '../../../styles/ComputersController.module.scss'
import {Collapse} from 'react-collapse'
import ComputerFilter from './ComputerFilter'

function ComputersController(props) {
    const [showFilter, setShowFilter] = useState(false)


    return (
        <div className='dashboard'>
            <div className={style.controllerContainer}>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" id="sorting-dropdown">
                        Sorting
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Label</Dropdown.Item>
                        <Dropdown.Item>Form Factor</Dropdown.Item>
                        <Dropdown.Item>Performance</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="outline-primary" onClick={() => setShowFilter(!showFilter)}>Filter</Button>
            </div>
            <Collapse isOpened={showFilter}>
                <ComputerFilter/>
            </Collapse>
        </div>
    )
}

export default ComputersController