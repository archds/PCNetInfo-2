import { SortingType } from 'core/enums'
import { FilterState } from 'core/state'

export interface StateContext {
    state: any
    setState(newState: any): void
}

export interface ComputersQueryVariables {
    sorting: SortingType
    filter: FilterState
    search: string
}