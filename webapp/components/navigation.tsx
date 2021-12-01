import { Paper, Tab, Tabs } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Navigation() {
    const router = useRouter()
    const [value, setValue] = useState(router.pathname)
    const handleClick = (path) => {
        setValue(path)
        router.push(path)
    }
    return (
        <header>
            <Paper>
                <Tabs centered value={value} textColor='primary' indicatorColor='primary'>
                    <Tab value='/' label='Computers' onClick={() => handleClick('/')}/>
                    <Tab value='/monitors' label='Monitors' onClick={() => handleClick('/monitors')}/>
                    <Tab value='/locations' label='Locations'  onClick={() => handleClick('/locations')}/>
                </Tabs>
            </Paper>
        </header>
    )
}