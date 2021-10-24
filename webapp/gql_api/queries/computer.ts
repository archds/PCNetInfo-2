import { gql } from '@apollo/client'

export const computerQuery = gql`
    query ($id: ID!) {
        computer(id: $id) {
            id
            type
            name
            domain
            username
            serial
            ip
            comment
            label
            user {
                id
                firstName
                lastName
                role
            }
            location
            updated
            formFactor
            ram
            ...OS
            ...CPU
            ...Videocard
        }
    }

    fragment OS on Computer {
        os {
            name
            architecture
        }
    }

    fragment CPU on Computer {
        cpu {
            name
            clock
            cores
            threads
        }
    }

    fragment Videocard on Computer {
        videocard {
            name
            memory
        }
    }
`