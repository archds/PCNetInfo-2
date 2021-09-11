import {gql} from '@apollo/client'

export const deletePC = gql`
    mutation ($name: String!) {
        deletePC(name: $name)
    }
`