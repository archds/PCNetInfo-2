import { gql } from '@apollo/client'

export const computersQuery = gql`
    query ($filter: FilterInput, $sorting: SortField, $search: String){
        computers(
            input: {
                filter: $filter
                sort: $sorting
                search: $search
            }
        ) {
            id
            name
            type
            label
            serial
            location
        }
    }
`