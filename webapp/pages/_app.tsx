import { ApolloProvider } from '@apollo/client'
import '@fontsource/roboto'
import { createTheme, ThemeProvider } from '@material-ui/core'
import client from 'apollo-client'
import AuthProvider from 'components/AuthProvider'
import Footer from 'components/Footer'
import HeadProvider from 'components/HeadProvider'
import Navigation from 'components/Navigation'
import { AppProps } from 'next/app'
import '../styles/main.scss'

const theme = createTheme({
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
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
})


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <HeadProvider>
                        <AuthProvider>
                            <Navigation/>
                            <Component {...pageProps} />
                            <Footer/>
                        </AuthProvider>
                    </HeadProvider>
                </ThemeProvider>
            </ApolloProvider>
        </>
    )
}

export default MyApp
