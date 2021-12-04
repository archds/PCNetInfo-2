import { Button, Paper, Tab, Tabs } from '@material-ui/core'
import { removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Navigation() {
    const router = useRouter()
    const [value, setValue] = useState(router.pathname)
    const handleClick = (path) => {
        setValue(path)
        router.push(path)
    }
    const handleLogout = () => {
        removeCookies('authToken')
        router.reload()
    }

    return (
        <header>
            <Paper style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div/>
                <Tabs centered value={value} textColor='primary' indicatorColor='primary'>
                    <Tab value='/' label='Computers' onClick={() => handleClick('/')}/>
                    <Tab value='/monitors' label='Monitors' onClick={() => handleClick('/monitors')}/>
                    <Tab value='/locations' label='Locations'  onClick={() => handleClick('/locations')}/>
                </Tabs>
                <Button style={{ marginRight: '10px' }} onClick={handleLogout}>
                    Logout
                </Button>
            </Paper>
        </header>
    )
}