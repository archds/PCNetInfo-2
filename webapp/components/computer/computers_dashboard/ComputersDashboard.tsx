import style from '/styles/ComputersDashboard.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import { GridRowId, GridSelectionModel } from '@mui/x-data-grid'
import { notifyError, notifySuccess } from 'components/shared/actions/notification'
import Loading from 'components/shared/components/Loading'
import ModalConfirm from 'components/shared/components/ModalConfirm'
import { SortingType, Unit } from 'components/shared/enums'
import { ComputersQueryVariables, StateContext } from 'components/shared/interfaces'
import { FilterState } from 'components/shared/state'
import { ComputerBaseInfo } from 'components/shared/types/computers'
import { deleteComputers } from 'gql_api/mutations/deleteComputers'
import { computersQuery } from 'gql_api/queries/computers'
import { SnackbarContext } from 'pages'
import React, { createContext, useContext, useState } from 'react'
import ComputerList from './computer_table/ComputerList'
import ControllerDashboard from './computer_table/controller/ControllerDashboard'

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
    } = useQuery<{ computers: ComputerBaseInfo[] }, ComputersQueryVariables>(computersQuery)
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

    const [deleteComputersQuery, { loading: deleteLoading }] = useMutation<Unit, { ids: GridSelectionModel }>(deleteComputers, {
        variables: {
            ids: selectedComputers,
        },
        onCompleted: (): void => {
            notifySuccess('Computer successfully deleted!', setSnackbarContext)
            setSelectedComputers([])
            setShowDeleteModal(false)
        },
        refetchQueries: [computersQuery],
        onError: error => {
            notifyError(error, setSnackbarContext)
            setSelectedComputers([])
            setShowDeleteModal(false)
        },
    })

    const onControllerChange = (sorting: SortingType, filter: FilterState, search: string): void => {
        refetchComputers({
            sorting: sorting,
            filter: filter,
            search: search,
        })
    }

    if (computersLoading || deleteLoading) {
        return (
            <div className={style.computersContainer}>
                <Loading/>
            </div>
        )
    }

    return (
        <div className={style.computersContainer}>
            <SelectedComputersContext.Provider value={selectedComputerContextValue}>
                <ControllerDashboard
                    onControllerChange={onControllerChange}
                    onDelete={() => setShowDeleteModal(true)}
                    showActions={!!selectedComputers.length}
                    onAddComputer={props.onAddComputer}
                />
                <ComputerList
                    onComputerClick={props.onComputerClick}
                    computers={computers.computers}
                />
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
