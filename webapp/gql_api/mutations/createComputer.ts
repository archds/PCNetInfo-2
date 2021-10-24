import { gql } from '@apollo/client'

export const createComputer = gql`
    mutation createComputer($input: CreateComputerInput!) {
        createComputer(input: $input) {
            name
        }
    }
`