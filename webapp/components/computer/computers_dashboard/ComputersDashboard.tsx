import style from '/styles/ComputersDashboard.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import { GridRowId, GridSelectionModel } from '@mui/x-data-grid'
import { ComputersQueryVariables, StateContext } from 'components/shared/interfaces'
import Loading from 'components/shared/Loading'
import { Computer, ComputerBaseInfo } from 'components/shared/types/computers'
import { SortingType } from 'components/shared/enums'
import { FilterState } from 'components/shared/state'
import { deletePC } from 'gql_api/mutations/deletePC'
import { allPCQuery } from 'gql_api/queries/allPC'
import React, { createContext, useState } from 'react'
import ModalConfirm from 'components/shared/ModalConfirm'
import ComputerList from './computer_table/ComputerList'
import ControllerDashboard from './computer_table/controller/ControllerDashboard'

export interface Props {
    onAddComputer(): void,
    onComputerClick(name: GridRowId): void,
}

export const SelectedComputersContext = createContext<StateContext>(null)

function ComputersDashboard(props: Props) {
    const {
        data: computers,
        loading: computersLoading,
        refetch: refetchComputers,
    } = useQuery<{AllPC: ComputerBaseInfo[]}, ComputersQueryVariables>(allPCQuery)
    // Management control
    const [selectedComputers, setSelectedComputers] = useState<GridSelectionModel>([])
    // Display control
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    // Context
    const selectedComputerContextValue: StateContext = {
        state: selectedComputers,
        setState: setSelectedComputers
    }


    const [deleteComputers, { loading: deleteLoading }] = useMutation(deletePC, {
        variables: {
            names: selectedComputers,
        },
        onCompleted: (): void => {
            setSelectedComputers([])
            setShowDeleteModal(false)
        },
        refetchQueries: [allPCQuery],
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
                    computers={computers.AllPC}
                />
                <ModalConfirm
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={deleteComputers}
                    title={'Delete this PC?'}
                    text={`To delete: ${selectedComputers.join(', ')}`}
                    isOpen={showDeleteModal}
                />
            </SelectedComputersContext.Provider>
        </div>
    )
}

export default ComputersDashboard
