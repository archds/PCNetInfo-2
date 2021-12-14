import { LoadingButton } from '@mui/lab'
import { Box, Card, LinearProgress, TextField, Typography } from '@mui/material'
import { useAuthLazyQuery, useVerifyTokenQuery } from 'api/generated/graphql'
import { getCookie, setCookies } from 'cookies-next'
import React, { useRef, useState } from 'react'

function AuthProvider(props) {
    const [authLoading, setAuthLoading] = useState<boolean>(false)
    const [authError, setAuthError] = useState<boolean>(false)
    const [auth] = useAuthLazyQuery({
        onCompleted: result => {
            if (result.auth.valid) {
                setCookies('authToken', result.auth.token, { path: '/', maxAge: 259200 })
                setAuthLoading(true)
            } else {
                setAuthError(true)
            }
        }
    })

    const {
        loading: verifyLoading,
        data: verifyResult,
        error: verifyError
    } = useVerifyTokenQuery({
        variables: { token: String(getCookie('authToken')) }
    })

    const usernameEl = useRef<HTMLInputElement>()
    const passwordEl = useRef<HTMLInputElement>()

    const handleAuth = () => {
        auth({
            variables: {
                username: usernameEl.current.querySelector('input').value,
                password: passwordEl.current.querySelector('input').value
            }
        })
    }

    if (verifyLoading) return <LinearProgress />
    if (verifyResult && verifyResult.verifyToken.valid) return props.children

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='100vh'
            sx={{
                background: 'linear-gradient(150deg, #35495E, #375165, #3C6675, #40888B, #42A18E, #41B187, #41B883)'
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    padding: '10px 30px 30px 30px',
                    gap: '10px',
                    width: '15rem'
                }}
            >
                <Typography variant='h4' sx={{ fontWeight: '600', margin: '20px 0 20px 0', textAlign: 'center' }}>
                    Login
                </Typography>
                <TextField
                    id='username'
                    label='Username'
                    type='text'
                    ref={usernameEl}
                    error={authError}
                    disabled={!!verifyError}
                />
                <TextField
                    id='password'
                    label='Password'
                    type='password'
                    ref={passwordEl}
                    error={authError}
                    disabled={!!verifyError}
                />
                <LoadingButton
                    loading={authLoading || verifyLoading}
                    variant='contained'
                    disableElevation
                    color='primary'
                    onClick={handleAuth}
                    sx={{ marginTop: '20px' }}
                >
                    Submit
                </LoadingButton>
                <Typography hidden={!verifyError} fontSize={12} color='error'>
                    Server is not reachable
                </Typography>
            </Card>
        </Box>
    )
}

export default AuthProvider
