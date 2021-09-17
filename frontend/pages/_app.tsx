import { ApolloProvider } from '@apollo/client'
import '@fontsource/roboto'
import { createTheme, ThemeProvider } from '@material-ui/core'
import client from '../apollo-client'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import '../styles/main.scss'
import {AppProps} from "next/app";

const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#41b883',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
            contrastText: '#fff'
        },
        secondary: {
            light: '#537293',
            main: '#35495e',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#fff',
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
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
                    <Navigation/>
                    <Component {...pageProps} />
                    <Footer/>
                </ThemeProvider>
            </ApolloProvider>
        </>
    )
}

export default MyApp
