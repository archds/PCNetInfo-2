import style from '/styles/ComputersDashboard.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import Loading from 'components/shared/Loading'
import { SortingType } from 'domain/enums'
import { FilterState } from 'domain/state'
import { allPCQuery } from 'gql_api/queries/allPC'
import React, { useState } from 'react'
import ModalConfirm from '../../shared/ModalConfirm'
import ComputerList from './computer_table/ComputerList'
import ControllerDashboard from './computer_table/controller/ControllerDashboard'
import {GridRowId} from "@mui/x-data-grid";
import {deletePC} from "gql_api/mutations/deletePC";

export interface Props {
    onAddComputer(): void,
    onComputerClick(name: GridRowId): void,
}

function ComputersDashboard(props: Props) {
    const {
        data: computersData,
        loading: computersLoading,
        refetch: refetchComputers,
    } = useQuery(allPCQuery)
    // Management control
    const [selectedComputers, setSelectedComputers] = useState([])
    // Display control
    const [showDeleteModal, setShowDeleteModal] = useState(false)


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
        console.log(123)
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
                <ControllerDashboard
                    onControllerChange={onControllerChange}
                    onDelete={() => setShowDeleteModal(true)}
                    showActions={!!selectedComputers.length}
                    onAddComputer={props.onAddComputer}
                />
                <ComputerList
                    onComputerClick={props.onComputerClick}
                    switchSelection={(newSelected) => setSelectedComputers(newSelected)}
                    computers={computersData.AllPC}
                />
                <ModalConfirm
                    handleClose={() => setShowDeleteModal(false)}
                    handleConfirm={deleteComputers}
                    modalHeading={'Delete this PC?'}
                    modalBody={`To delete: ${selectedComputers.join(', ')}`}
                    show={showDeleteModal}
                />
            </div>
    )
}

export default ComputersDashboard
