import { deletePC } from '/gql_api/mutations/deletePC'
import style from '/styles/ComputersDashboard.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import Loading from 'components/shared/Loading'
import { allPCQuery } from 'gql_api/queries/allPC'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import ModalConfirm from '../../shared/ModalConfirm'
import ComputerList from './computer_table/ComputerList'
import ControllerDashboard from './computer_table/controller/ControllerDashboard'

function ComputersDashboard(props) {
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
        onCompleted: () => {
            setSelectedComputers([])
            setShowDeleteModal(false)
        },
        refetchQueries: [allPCQuery],
    })

    const onControllerChange = (sorting, filter, search) => {
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
                    onControllerChange={(sorting, filter, search) => onControllerChange(sorting, filter, search)}
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

ComputersDashboard.propTypes = {
    onAddComputer: PropTypes.func.isRequired,
    onComputerClick: PropTypes.func.isRequired,
}