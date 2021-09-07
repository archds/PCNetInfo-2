import '../styles/main.scss'
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import {ApolloProvider} from "@apollo/client";
import client from "../apollo-client";


function MyApp({Component, pageProps}) {
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
