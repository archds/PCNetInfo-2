import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getCookie } from 'cookies-next'

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URI}/api/`
})

const authLink = setContext((_, { headers }) => {
    const token = String(getCookie('authToken'))

    return {
        headers: {
            ...headers,
            authorization: token ? `Token ${token}` : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log(graphQLErrors)
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
})

const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
})

export default client
