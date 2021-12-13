import { GridRowId, GridSelectionModel } from '@mui/x-data-grid'
import { ComputersDocument, useComputersQuery, useDeleteComputersMutation, } from 'api/generated/graphql'
import ComputerList from 'components/computer/ComputerList'
import Loading from 'components/shared/Loading'
import ModalConfirm from 'components/shared/ModalConfirm'
import NotFound from 'components/shared/NotFound'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { SnackbarContext } from 'pages/_app'
import React, { createContext, ReactElement, useContext, useState } from 'react'
import { StateContext } from 'core/interfaces'
import { Box } from '@mui/system'
import { Paper } from '@mui/material'
import ComputerActions from 'components/computer/controller/ComputerActions'
import Search from 'components/computer/controller/Search'

export interface Props {
    onAddComputer(): void,
    onComputerClick(id: GridRowId): void,
}


export const SelectedComputersContext = createContext<StateContext<GridSelectionModel>>(null)

function ComputersDashboard(props: Props) {
    const {
        data: computers,
        loading: computersLoading,
        refetch: refetchComputers,
        error: computersFetchError,
    } = useComputersQuery()
    // Management control
    const [selectedComputers, setSelectedComputers] = useState<GridSelectionModel>([])
    // Display control
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    // Context
    const { setState: setSnackbarContext } = useContext(SnackbarContext)

    const selectedComputerContextValue: StateContext<GridSelectionModel> = {
        state: selectedComputers,
        setState: setSelectedComputers,
    }

    const [deleteComputersQuery, { loading: deleteLoading }] = useDeleteComputersMutation(
        {
            variables: { ids: selectedComputers as string[], },
            onCompleted: (): void => {
                notifySuccess('Computer successfully deleted!', setSnackbarContext)
                setSelectedComputers([])
                setShowDeleteModal(false)
            },
            refetchQueries: [ComputersDocument],
            onError: error => {
                notifyError(error, setSnackbarContext)
                setSelectedComputers([])
                setShowDeleteModal(false)
            },
        },
    )


    let dashboard: ReactElement
    if (computersLoading || deleteLoading) {
        dashboard = <Loading/>
    } else if (computersFetchError) {
        dashboard = <NotFound
            message='Unknown error occurred'
            helpMessage='Click for copy debug info!'
            debugInfo={JSON.stringify({
                'graphQLErrors': computersFetchError.graphQLErrors,
                'clientErrors': computersFetchError.clientErrors,
                'message': computersFetchError.message,
                'networkError': computersFetchError.networkError,
                'extraInfo': computersFetchError.extraInfo,
            })}
        />
    } else if (computers) {
        dashboard = <ComputerList computers={computers.computers} onComputerClick={props.onComputerClick}/>
    }

    return (
        <Box display='grid' gridTemplateRows='auto 10fr' gap='20px' minWidth='65%'>
            <SelectedComputersContext.Provider value={selectedComputerContextValue}>
                <Paper sx={{ padding: '15px 40px', display: 'flex', justifyContent: 'space-between' }}>
                    <Box><Search onSearchChange={(value => refetchComputers({ search: value }))}/></Box>
                    <ComputerActions
                        onDelete={() => setShowDeleteModal(true)}
                        showDelete={!!selectedComputers.length}
                        onAddComputer={props.onAddComputer}
                        disabled={!!computersFetchError}
                    />
                </Paper>
                <Paper sx={{ display: 'flex', height: '100%' }}>{dashboard}</Paper>
                <ModalConfirm
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={deleteComputersQuery}
                    title='Delete this PC?'
                    text={`To delete: ${selectedComputers.join(', ')}`}
                    isOpen={showDeleteModal}
                />
            </SelectedComputersContext.Provider>
        </Box>
    )
}

export default ComputersDashboard
