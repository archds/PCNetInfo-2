import { Skeleton } from '@material-ui/lab'
import { BaseProps } from 'components/computer/actions_dashboard/computer_info/defaults'
import { ComputerType } from 'components/shared/enums'
import Image from 'next/image'
import React from 'react'

export interface Props extends BaseProps {
    type: ComputerType
}

function TypeIdentifier(props: Props) {
    const dimensionProps = { width: 160, height: 100 }
    if (props.loading) {
        return <Skeleton variant='rect' {...dimensionProps}/>
    }
    switch (props.type) {
        case ComputerType.DESKTOP:
            return <Image src='/img/computer.png' {...dimensionProps}/>
        case ComputerType.LAPTOP:
            return <Image src='/img/laptop.png' {...dimensionProps}/>
    }
}

export default TypeIdentifier