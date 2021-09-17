import { SortingType } from 'components/shared/enums'
import { FilterState } from 'components/shared/state'

export interface StateContext {
    state: any
    setState(newState: any): void
}

export interface ComputersQueryVariables {
    sorting: SortingType
    filter: FilterState
    search: string
}