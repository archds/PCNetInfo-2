import { Skeleton } from '@material-ui/lab'
import React from 'react'

export interface BaseProps {
    loading: boolean
}

export const skeletonText = <Skeleton variant='text' width={100}/>
export const skeletonImage = <Skeleton variant='rect' width={160} height={80}/>
export const defaultNoDataMessage = 'No data'