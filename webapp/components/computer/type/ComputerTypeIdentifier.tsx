import style from '/components/computer/type/ComputerType.module.scss'
import { useMutation } from '@apollo/client'
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'
import LaptopIcon from '@material-ui/icons/Laptop'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { ComputerType } from 'core/enums'
import { updateComputer } from 'gql_api/mutations/updateComputer'
import { SnackbarContext } from 'pages'
import React, { useContext, useState } from 'react'


export interface Props {
    id: string,
    type: ComputerType
}

function ComputerTypeIdentifier(props: Props) {
    const { setState: setSnackbar } = useContext(SnackbarContext)
    const [type, setType] = useState<ComputerType>(props.type)
    const [updateComputerQuery] = useMutation(updateComputer)
    const switchType = () => {
        const newType = type === ComputerType.DESKTOP ? ComputerType.LAPTOP : ComputerType.DESKTOP
        updateComputerQuery({
            variables: {
                id: props.id,
                input: {
                    type: newType,
                },
            },
            onCompleted: () => {
                setType(newType)
                notifySuccess('Information updated!', setSnackbar)
            },
            onError: (error) => {
                notifyError(error, setSnackbar)
            },
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