import { gql } from '@apollo/client'

export const deleteComputers = gql`
    mutation ($names: [String!]!) {
        deleteComputer(names: $names)
    }
`