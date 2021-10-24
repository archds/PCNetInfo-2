import { gql } from '@apollo/client'

export const deleteComputers = gql`
    mutation ($ids: [ID!]!) {
        deleteComputer(ids: $ids)
    }
`