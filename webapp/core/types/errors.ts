export interface MainError {
    __typename: string
}

export interface ReadableError extends MainError {
    message: string
}

export interface InputError extends ReadableError {
    field: string
}