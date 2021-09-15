import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { FormCheck } from 'react-bootstrap'
import { updatePC } from '/gql_api/mutations/updatePC'
import style from '/styles/ComputerElement.module.scss'
import ComputerType from './ComputerType'
import { Tooltip } from '/components/shared/Tooltip'


const computerTypes = {
    desktop: 'DESKTOP',
    laptop: 'LAPTOP',
}

function ComputerElement(props) {
    const [pcType, setPcType] = useState(props.pc.type)
    const [selected, setSelected] = useState(false)
    const [updateComputer, { data, loading, error }] = useMutation(updatePC)

    const switchType = () => {
        if (pcType === computerTypes.desktop) {
            updateComputer({
                variables: {
                    name: props.pc.name,
                    input: {
                        type: computerTypes.laptop,
                    },
                },
            })
            setPcType(computerTypes.laptop)
        }
        if (pcType === computerTypes.laptop) {
            updateComputer({
                variables: {
                    name: props.pc.name,
                    input: {
                        type: computerTypes.desktop,
                    },
                },
            })
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