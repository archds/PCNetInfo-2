export interface ReadableError {
    __typename: string
    message: string
}

export interface InputError extends ReadableError {
    field: string
}