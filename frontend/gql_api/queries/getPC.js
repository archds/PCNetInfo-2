import {gql} from '@apollo/client'

export const getPCQuery = gql`
    query ($name: String!) {
        getPC(name: $name) {
            type
            name
            form_factor
            domain
            username
            timezone
            serial
            ip
            comment
            label
            user
            location
            updated
            form_factor
            ...OS
            ...CPU
            ...RAM
            ...Motherboard
            ...Videocard
        }
    }

    fragment OS on PC {
        os {
            name
            version
            architecture
        }
    }
    
    fragment RAM on PC {
        ram {
            size
            banks {
                speed
                capacity
            }
        }
    }
    
    fragment CPU on PC {
        cpu {
            name
            clock
            cores
            threads
            socket
        }
    }
    
    fragment Motherboard on PC {
        motherboard {
            manufacturer
            product
            serial
        }
    }
    
    fragment Videocard on PC {
        videocard {
            name
            resX
            resY
        }
    }
`