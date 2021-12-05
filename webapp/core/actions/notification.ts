import { ApolloError } from '@apollo/client/errors'

export function notifyError(error: ApolloError, setSnackbarContext: (newState: any) => void) {
    error.graphQLErrors.forEach(err => {
        setSnackbarContext({ severity: 'error', show: true, message: err.message })
    })
}

export function notifySuccess(message: string, setSnackbarContext: (newState: any) => void) {
    setSnackbarContext({ severity: 'success', show: true, message: message })
}