import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
    return <Box display='flex' justifyContent='center' alignItems='center' width='100%'><CircularProgress/></Box>
}

export default Loading