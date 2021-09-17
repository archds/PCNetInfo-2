import { FilterType } from 'domain/enums'

export interface FilterState {
    serialNumber?: FilterType
    location?: FilterType
    formFactor?: string
}
