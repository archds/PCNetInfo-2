import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_ROOT_URI}/api/`,
})


const authLink = setContext((_, { headers }) => {
    const token = String(getCookie('authToken'))

    return {
        headers: {
            ...headers,
            authorization: token ? `Token ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})


export default client