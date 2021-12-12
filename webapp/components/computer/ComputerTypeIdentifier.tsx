import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import LaptopIcon from '@mui/icons-material/Laptop'
import { ComputerType, useUpdateComputerMutation } from 'api/generated/graphql'
import { notifyError, notifySuccess } from 'core/actions/notification'
import React, { useContext, useState } from 'react'
import { SnackbarContext } from 'pages/_app'
import { SxProps } from '@mui/system'


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

    const typeIconStyle: SxProps = {
        borderRadius: '5px',
        padding: '5px',
        boxSizing: 'content-box',
        transition: 'ease 0.2s',
        '&:hover': {
            color: '#41B883',
            background: '#0000000D',
        }
    }


    switch (type) {
        case ComputerType.DESKTOP:
            return <DesktopWindowsIcon
                onClick={switchType}
                fontSize='medium'
                sx={typeIconStyle}
            />
        case ComputerType.LAPTOP:
            return <LaptopIcon
                onClick={switchType}
                fontSize='medium'
                sx={typeIconStyle}
            />
    }
}

export default ComputerTypeIdentifier