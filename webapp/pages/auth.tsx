import { Button, Card, TextField } from '@material-ui/core'
import { useAuthLazyQuery } from 'api/generated/graphql'
import HeadComponent from 'components/head'
import React, { useRef } from 'react'
import style from './auth.module.scss'

function Auth() {
    const [auth, { loading, error, data }] = useAuthLazyQuery()
    const usernameEl = useRef<HTMLInputElement>()
    const passwordEl = useRef<HTMLInputElement>()
    const handleAuth = () => {
        auth({
            variables: {
                username: usernameEl.current.querySelector('input').value,
                password: passwordEl.current.querySelector('input').value,
            },
        }).then(() => {
            console.log(data)
        })
    }

    return (
        <>
            <HeadComponent/>
            <div className={style.authContainer}>
                <Card className={style.authCard}>
                    <h3>Login</h3>
                    <TextField id='username' label='Username' type='text' ref={usernameEl}/>
                    <TextField id='password' label='Password' type='password' ref={passwordEl}/>
                    <Button variant='contained' disableElevation color='primary' onClick={handleAuth}>Submit</Button>
                </Card>
            </div>
        </>
    )
}

export default Auth