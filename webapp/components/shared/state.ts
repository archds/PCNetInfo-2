import { FilterType } from 'components/shared/enums'

export interface FilterState {
    serialNumber?: FilterType
    location?: FilterType
    formFactor?: string
}
