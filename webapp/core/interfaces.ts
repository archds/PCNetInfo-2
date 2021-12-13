export interface StateContext<T> {
    state: T
    setState(newState: T): void
}
