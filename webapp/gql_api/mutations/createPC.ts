import { gql } from '@apollo/client'

export const createPC = gql`
    mutation createPC($input: CreatePCInput!) {
        createPC(input: $input) {
            name
        }
    }
`