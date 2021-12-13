import Image from 'next/image'
import { Box, Typography, useMediaQuery } from '@mui/material'
import django from 'public/img/techs/django.png'
import djangoMini from 'public/img/techs/django-mini.jpg'
import ariadne from 'public/img/techs/ariadne.png'
import ariadneMini from 'public/img/techs/ariadne-mini.png'
import graphql from 'public/img/techs/graphql.png'
import graphqlMini from 'public/img/techs/graphql-mini.png'

export default function Footer() {

    const matches = useMediaQuery('(min-height:700px)');

    return (
        <footer>
            <Box
                paddingTop='20px'
                display='flex'
                alignItems='center'
                flexDirection='column'
                flexWrap='wrap'
                position='relative'
                width={matches? '70%':'90%'}
            >
                <Box display='grid' gridTemplateColumns='3fr minmax(min-content, max-content) 7fr' width='100%'>
                    <Typography variant={matches? 'h4': 'h6'}>PC Net <span>Info</span></Typography>
                    <Box display='flex' flexDirection={matches?'column':'row'}>
                        <a target='_blank' href='https://www.techpowerup.com/cpu-specs/' rel='noreferrer'>
                            CPU Database
                        </a> &nbsp;
                        <a target='_blank' href='https://www.techpowerup.com/gpu-specs/' rel='noreferrer'>
                            GPU Database
                        </a>
                    </Box>
                    <Box display='flex' gap='20px' justifySelf='end'>
                        <a target='_blank' className='tech-logo' href='https://www.djangoproject.com/' rel='noreferrer'>
                            {matches?<Image src={django} width={120} height={41}/>:<Image src={djangoMini} width={40} height={40}/>}
                        </a>
                        <a target='_blank' className='tech-logo' href='https://ariadnegraphql.org/' rel='noreferrer'>
                            {matches?<Image src={ariadne} width={150} height={38}/>:<Image src={ariadneMini} width={40} height={40}/>}
                        </a>
                        <a target='_blank' className='tech-logo' href='https://graphql.org/' rel='noreferrer'>
                            {matches?<Image src={graphql} width={140} height={40}/>:<Image src={graphqlMini} width={40} height={40}/>}
                        </a>
                    </Box>
                </Box>
            </Box>
        </footer>
    )
}