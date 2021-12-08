import Image from 'next/image'
import { Box, Typography } from '@mui/material'

export default function monitors() {
    return (
        <>
            <Box><Typography variant='h3' fontWeight={600} align='center'>Work in progress here.</Typography></Box>
            <Box>
                <Typography align='center' marginTop='20px' marginBottom='20px'>
                    You need to wait until this guys setting all up.
                </Typography>
            </Box>
            <Box justifyContent='center' display='flex'>
                <Image src='/img/wip_cover.svg' width={1000} height={600}/>
            </Box>
        </>
    )
}