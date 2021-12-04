import { Button, Card, TextField } from '@material-ui/core'
import { useAuthLazyQuery, useVerifyTokenQuery } from 'api/generated/graphql'
import Loading from 'components/shared/loading/Loading'
import { getCookie, setCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import style from 'pages/auth.module.scss'
import React, { useRef } from 'react'

function AuthProvider(props) {
    const router = useRouter()
    const [auth, { loading: authLoading, data: authData, error: authError }] = useAuthLazyQuery({
        onCompleted: data => {
            setCookies('authToken', data.auth.token, { path: '/', maxAge: 259200 })
            // router.reload()
        },
    })

    const { loading: verifyLoading, data: verifyData } = useVerifyTokenQuery({
        variables: {
            token: String(getCookie('authToken')),
        },
    })

    const usernameEl = useRef<HTMLInputElement>()
    const passwordEl = useRef<HTMLInputElement>()

    const handleAuth = (event) => {
        auth({
            variables: {
                username: usernameEl.current.querySelector('input').value,
                password: passwordEl.current.querySelector('input').value,
            },
        })
    }

    let authSubmit = <Button variant='contained' disableElevation color='primary' onClick={handleAuth}>Submit</Button>

    if (verifyData) return props.children
    if (verifyLoading) return <Loading/>
    if (authLoading) authSubmit = <Loading/>

    return (
        <>
            <div className={style.authContainer}>
                <Card className={style.authCard}>
                    <h3>Login</h3>
                    <TextField id='username' label='Username' type='text' ref={usernameEl} error={!!authError}/>
                    <TextField id='password' label='Password' type='password' ref={passwordEl} error={!!authError}/>
                    {authSubmit}
                </Card>
            </div>
        </>
    )
}

export default AuthProvider