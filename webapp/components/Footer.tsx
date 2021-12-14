import Image from 'next/image'
import { Box, Typography } from '@mui/material'

export default function Footer() {
    return (
        <footer>
            <Box
                paddingTop='20px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                flexWrap='wrap'
                position='relative'
                width='70%'
            >
                <Box display='grid' gridTemplateColumns='3fr 2fr 7fr' width='100%'>
                    <Typography variant='h4'>
                        PC Net <span>Info</span>
                    </Typography>
                    <Box display='flex' flexDirection='column' flexWrap='wrap'>
                        <a target='_blank' href='https://www.techpowerup.com/cpu-specs/' rel='noreferrer'>
                            CPU Database
                        </a>
                        <a target='_blank' href='https://www.techpowerup.com/gpu-specs/' rel='noreferrer'>
                            GPU Database
                        </a>
                    </Box>
                    <Box display='flex' gap='20px' justifySelf='end'>
                        <a target='_blank' className='tech-logo' href='https://www.djangoproject.com/' rel='noreferrer'>
                            <Image src='/img/techs/django.png' width={120} height={41} />
                        </a>
                        <a target='_blank' className='tech-logo' href='https://ariadnegraphql.org/' rel='noreferrer'>
                            <Image src='/img/techs/ariadne.png' width={150} height={38} />
                        </a>
                        <a target='_blank' className='tech-logo' href='https://graphql.org/' rel='noreferrer'>
                            <Image src='/img/techs/graphql.png' width={140} height={40} />
                        </a>
                    </Box>
                </Box>
            </Box>
        </footer>
    )
}
