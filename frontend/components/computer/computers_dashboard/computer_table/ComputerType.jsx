import style from '/styles/ComputerType.module.scss'
import { useMutation } from '@apollo/client'
import { updatePC } from 'gql_api/mutations/updatePC'
import { ComputersContext } from 'pages'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import LaptopIcon from '@material-ui/icons/Laptop'

function ComputerType(props) {
    const context = useContext(ComputersContext)
    const computerTypes = context.enums.computerType
    const [type, setType] = useState(props.type)
    const [updateComputer] = useMutation(updatePC)
    const switchType = () => {
        const newType = type === computerTypes.desktop ? computerTypes.laptop : computerTypes.desktop
        updateComputer({
            variables: {
                name: props.name,
                input: {
                    type: newType,
                },
            },
            onCompleted: setType(newType),
        })
    }

    if (type === computerTypes.desktop) {
        return <DesktopWindowsIcon
            onClick={switchType}
            fontSize='medium'
            className={style.computerType}
        />
    }

    if (type === computerTypes.laptop) {
        return <LaptopIcon
            onClick={switchType}
            fontSize='medium'
            className={style.computerType}
        />
    }
}

export default ComputerType

ComputerType.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}