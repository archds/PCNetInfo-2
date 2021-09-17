import { gql } from '@apollo/client'

export const deletePC = gql`
    mutation ($names: [String!]!) {
        deletePC(names: $names)
    }
`