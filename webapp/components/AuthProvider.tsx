import { LoadingButton } from '@mui/lab'
import { Card, TextField } from '@mui/material'
import { useAuthLazyQuery, useVerifyTokenQuery } from 'api/generated/graphql'
import { getCookie, setCookies } from 'cookies-next'
import style from 'pages/auth.module.scss'
import React, { useRef, useState } from 'react'

function AuthProvider(props) {
    const [authLoading, setAuthLoading] = useState(false)
    const [auth, { data: authData, error: authError }] = useAuthLazyQuery({
        onCompleted: data => {
            setCookies('authToken', data.auth.token, { path: '/', maxAge: 259200 })
            setAuthLoading(true)
        },
    })

    const { loading: verifyLoading, data: verifyData } = useVerifyTokenQuery({
        variables: {
            token: String(getCookie('authToken')),
        },
    })

    const usernameEl = useRef<HTMLInputElement>()
    const passwordEl = useRef<HTMLInputElement>()

    const handleAuth = () => {
        auth({
            variables: {
                username: usernameEl.current.querySelector('input').value,
                password: passwordEl.current.querySelector('input').value,
            },
        })
    }

    if (verifyData) return props.children

    return (
        <>
            <div className={style.authContainer}>
                <Card className={style.authCard}>
                    <h3>Login</h3>
                    <TextField id='username' label='Username' type='text' ref={usernameEl} error={!!authError}/>
                    <TextField id='password' label='Password' type='password' ref={passwordEl} error={!!authError}/>
                    <LoadingButton
                        loading={authLoading || verifyLoading}
                        variant='contained'
                        disableElevation
                        color='primary'
                        onClick={handleAuth}
                    >Submit</LoadingButton>
                </Card>
            </div>
        </>
    )
}

export default AuthProvider