import React, {useRef, useState} from 'react'
import {FormCheck} from 'react-bootstrap'
import PropTypes from 'prop-types'
import ComputerType from './ComputerType'
import style from '../../../styles/ComputerElement.module.scss'


const computerTypes = {
    desktop: 'desktop',
    laptop: 'laptop',
}

function ComputerElement(props) {
    const [pcType, setPcType] = useState(computerTypes.desktop)
    const [selected, setSelected] = useState(false)
    const mounted = useRef(false)

    const switchType = () => {
        if (pcType === computerTypes.desktop) {
            setPcType(computerTypes.laptop)
        }
        if (pcType === computerTypes.laptop) {
            setPcType(computerTypes.desktop)
        }
    }

    const switchSelection = (e) => {
        setSelected(e.target.checked)
        props.switchSelection(props.pc.name)
    }


    return (
        <tr key={props.pc.name} className={selected ? style.selected : null}>
            <td key='checkbox'>
                <FormCheck type='checkbox' onChange={e => switchSelection(e)}/>
            </td>
            <td><ComputerType switchType={switchType} type={pcType}/></td>
            <td><a href='' onClick={e => props.onComputerClick(props.pc.name, e)}>{props.pc.label}</a></td>
            <td>{props.pc.serial}</td>
            <td>{props.pc.location}</td>
        </tr>
    )
}

export default ComputerElement

ComputerElement.propTypes = {
    onComputerClick: PropTypes.func,
    pc: PropTypes.object,
    switchSelection: PropTypes.func.isRequired,
}