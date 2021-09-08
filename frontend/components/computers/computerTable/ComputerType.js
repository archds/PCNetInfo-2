import PropTypes from 'prop-types'
import React from 'react'
import {AiOutlineDesktop, AiOutlineLaptop} from 'react-icons/ai'
import style from '../../../styles/ComputerType.module.scss'

function ComputerType(props) {
    if (props.type === 'desktop') {
        return <AiOutlineDesktop onClick={props.switchType} size={22} className={style.computerType}/>
    }

    if (props.type === 'laptop') {
        return <AiOutlineLaptop onClick={props.switchType} size={22} className={style.computerType}/>
    }
}

export default ComputerType

ComputerType.propTypes = {
  switchType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}