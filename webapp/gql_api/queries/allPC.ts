import { gql } from '@apollo/client'

export const allPCQuery = gql`
    query ($filter: FilterInput, $sorting: SortField, $search: String){
        AllPC(
            input: {
                filter: $filter
                sort: $sorting
                search: $search
            }
        ) {
            name
            type
            label
            serial
            location
        }
    }
`