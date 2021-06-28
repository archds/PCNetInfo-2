import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

export const client = new ApolloClient({
  uri: '/api',
  cache: new InMemoryCache()
});