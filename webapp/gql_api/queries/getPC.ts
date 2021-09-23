import { gql } from '@apollo/client'

export const getPCQuery = gql`
    query ($name: String!) {
        getPC(name: $name) {
            type
            name
            form_factor
            domain
            username
            serial
            ip
            comment
            label
            user
            location
            updated
            form_factor
            ram
            ...OS
            ...CPU
            ...Videocard
        }
    }

    fragment OS on PC {
        os {
            name
            architecture
        }
    }

    fragment CPU on PC {
        cpu {
            name
            clock
            cores
            threads
        }
    }

    fragment Videocard on PC {
        videocard {
            name
            memory
        }
    }
`