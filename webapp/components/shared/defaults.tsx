import { Skeleton } from '@mui/material'
import React from 'react'

export interface BaseProps {
    loading: boolean
}

export const skeletonText = <Skeleton variant='text' width={100} />
export const skeletonImage = <Skeleton variant='rectangular' width={160} height={80} />
export const defaultNoDataMessage = 'No data'
