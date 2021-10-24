import { gql } from '@apollo/client'

export const updateComputer = gql`
    mutation updateComputer($id: ID!, $input: UpdateComputerInput!) {
        updateComputer(id: $id, input: $input) {
            name
        }
    }
`