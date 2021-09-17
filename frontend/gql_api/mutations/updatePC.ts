import {gql} from '@apollo/client'

export const updatePC = gql`
    mutation updatePC($name: String!, $input: UpdatePCInput!) {
        updatePC(name: $name, input: $input) {
            name
        }
    }
`