import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import Footer from '../components/footer'
import Navigation from '../components/navigation'
import '../styles/main.scss'


function MyApp({ Component, pageProps }) {
    return (
        <>
            <ApolloProvider client={client}>
                <Navigation/>
                <Component {...pageProps} />
                <Footer/>
            </ApolloProvider>
        </>
    )
}

export default MyApp
