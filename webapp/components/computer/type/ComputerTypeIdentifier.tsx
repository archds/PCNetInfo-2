import style from '/components/computer/type/ComputerType.module.scss'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import LaptopIcon from '@mui/icons-material/Laptop'
import { ComputerType, useUpdateComputerMutation } from 'api/generated/graphql'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { SnackbarContext } from 'pages'
import React, { useContext, useState } from 'react'


export interface Props {
    id: string,
    type: ComputerType
}

function ComputerTypeIdentifier(props: Props) {
    const { setState: setSnackbar } = useContext(SnackbarContext)
    const [type, setType] = useState<ComputerType>(props.type)
    const [updateComputerQuery] = useUpdateComputerMutation()
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