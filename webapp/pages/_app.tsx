import { ApolloProvider } from '@apollo/client'
import '@fontsource/roboto'
import {
    createMuiTheme as createThemeV4,
    StylesProvider,
    ThemeProvider as ThemeProviderV4,
} from '@material-ui/core/styles'
import { CssBaseline, Snackbar, StyledEngineProvider, Theme } from '@mui/material'
import Alert, { AlertColor } from '@mui/material/Alert'
import { createTheme as createThemeV5, ThemeProvider as ThemeProviderV5 } from '@mui/material/styles'
import { ThemeOptions } from '@mui/material/styles/createTheme'
import { createGenerateClassName } from '@mui/styles'
import client from 'apollo-client'
import AuthProvider from 'components/AuthProvider'
import Footer from 'components/Footer'
import HeadProvider from 'components/HeadProvider'
import Navigation from 'components/Navigation'
import { StateContext } from 'core/interfaces'
import { AppProps } from 'next/app'
import React, { createContext, useState } from 'react'
import '../styles/main.scss'


declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {
    }
}

const generateClassName = createGenerateClassName({
    // By enabling this option, if you have non-MUI elements (e.g. `<div />`)
    // using MUI classes (e.g. `.MuiButton`) they will lose styles.
    // Make sure to convert them to use `styled()` or `<Box />` first.
    disableGlobal: true,
    // Class names will receive this seed to avoid name collisions.
    seed: 'mui-jss',
})

const theme: ThemeOptions = {
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#41B883',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
            contrastText: '#FFFFFF',
        },
        secondary: {
            light: '#537293',
            main: '#35495E',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#FFFFFF',
        },
        error: {
            light: '#E57373',
            main: '#F44336',
            dark: '#D32F2F',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#28A745',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
    components: {
        MuiSelect: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: '10px'
                },
            }
        },
    },
    typography: {
        h1: { color: '#35495E' },
        h2: { color: '#35495E' },
        h3: { color: '#35495E' },
        h4: { color: '#35495E' },
        h5: { color: '#35495E' },
        h6: { color: '#35495E' },
    }
}

// @ts-ignore
const themeV4 = createThemeV4(theme)
const themeV5 = createThemeV5(theme)


export interface SnackbarContextInterface {
    severity: AlertColor
    message?: string
    show: boolean
}

export const SnackbarContext = createContext<StateContext>(null)


function MyApp({ Component, pageProps }: AppProps) {
    const [snackbar, setSnackbar] = useState<SnackbarContextInterface>({ severity: 'success', show: false })

    const snackbarContextValue: StateContext = {
        state: snackbar,
        setState: setSnackbar,
    }

    return <>
        <ApolloProvider client={client}>
            <StyledEngineProvider injectFirst>
                <StylesProvider generateClassName={generateClassName}>
                    <ThemeProviderV4 theme={themeV4}>
                        <ThemeProviderV5 theme={themeV5}>
                            <HeadProvider>
                                <SnackbarContext.Provider value={snackbarContextValue}>
                                    <CssBaseline/>
                                    <AuthProvider>
                                        <Navigation/>
                                        <Component {...pageProps} />
                                        <Footer/>
                                    </AuthProvider>
                                </SnackbarContext.Provider>
                                <Snackbar
                                    open={snackbar.show}
                                    autoHideDuration={6000}
                                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                                    onClose={() => setSnackbar({ severity: 'success', show: false })}
                                >
                                    <Alert variant='filled' severity={snackbar.severity}>{snackbar.message}</Alert>
                                </Snackbar>
                            </HeadProvider>
                        </ThemeProviderV5>
                    </ThemeProviderV4>
                </StylesProvider>
            </StyledEngineProvider>
        </ApolloProvider>
    </>
}

export default MyApp
