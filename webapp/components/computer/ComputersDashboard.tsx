import style from '/components/computer/controller/ControllerDashboard.module.scss'
import { GridRowId, GridSelectionModel } from '@mui/x-data-grid'
import {
    ComputersDocument,
    FilterInput,
    SortField,
    useComputersQuery,
    useDeleteComputersMutation,
} from 'api/generated/graphql'
import ComputerList from 'components/computer/ComputerList'
import ControllerDashboard from 'components/computer/controller/ControllerDashboard'
import Loading from 'components/shared/loading/Loading'
import ModalConfirm from 'components/shared/ModalConfirm'
import NotFound from 'components/shared/not_found/NotFound'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { StateContext } from 'core/interfaces'
import { SnackbarContext } from 'pages'
import React, { createContext, ReactElement, useContext, useState } from 'react'

export interface Props {
    onAddComputer(): void,

    onComputerClick(id: GridRowId): void,
}


export const SelectedComputersContext = createContext<StateContext>(null)

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

    const selectedComputerContextValue: StateContext = {
        state: selectedComputers,
        setState: setSelectedComputers,
    }

    const [deleteComputersQuery, { loading: deleteLoading }] = useDeleteComputersMutation(
        {
            variables: {
                ids: selectedComputers as string[],
            },
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

    const onControllerChange = (sorting: SortField, filter: FilterInput, search: string): void => {
        refetchComputers({
            sorting: sorting,
            filter: filter,
            search: search,
        })
    }

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
        dashboard = <ComputerList onComputerClick={props.onComputerClick} computers={computers.computers}/>
    }

    return (
        <div className={style.computersContainer}>
            <SelectedComputersContext.Provider value={selectedComputerContextValue}>
                <ControllerDashboard
                    onControllerChange={onControllerChange}
                    onDelete={() => setShowDeleteModal(true)}
                    showActions={!!selectedComputers.length}
                    onAddComputer={props.onAddComputer}
                    disabled={!!computersFetchError}
                />
                <div className='dashboard' style={{ display: 'flex', height: '100%' }}>{dashboard}</div>
                <ModalConfirm
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={deleteComputersQuery}
                    title='Delete this PC?'
                    text={`To delete: ${selectedComputers.join(', ')}`}
                    isOpen={showDeleteModal}
                />
            </SelectedComputersContext.Provider>
        </div>
    )
}

export default ComputersDashboard
