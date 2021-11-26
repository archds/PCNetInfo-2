import style from '/styles/ComputerType.module.scss'
import { useMutation } from '@apollo/client'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import LaptopIcon from '@material-ui/icons/Laptop'
import { ComputerType } from 'core/enums'
import { updateComputer } from 'gql_api/mutations/updateComputer'
import React, { useState } from 'react'


export interface Props {
    name: string,
    type: ComputerType
}

function ComputerTypeIdentifier(props: Props) {
    const [type, setType] = useState<ComputerType>(props.type)
    const [updateComputerQuery] = useMutation(updateComputer)
    const switchType = () => {
        const newType = type === ComputerType.DESKTOP ? ComputerType.LAPTOP : ComputerType.DESKTOP
        updateComputerQuery({
            variables: {
                name: props.name,
                input: {
                    type: newType,
                },
            },
            onCompleted: () => setType(newType),
        })
    }

    switch (type) {
        case ComputerType.DESKTOP:
            return <DesktopWindowsIcon
                onClick={switchType}
                fontSize='medium'
                className={style.computerType}
            />
        case ComputerType.LAPTOP:
            return <LaptopIcon
                onClick={switchType}
                fontSize='medium'
                className={style.computerType}
            />
    }
}

export default ComputerTypeIdentifier