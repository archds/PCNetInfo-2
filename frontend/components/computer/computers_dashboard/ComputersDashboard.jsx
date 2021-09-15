import PropTypes from 'prop-types'
import { deletePC } from '/gql_api/mutations/deletePC'
import style from '/styles/ComputersDashboard.module.scss'
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import ModalConfirm from '../../shared/ModalConfirm'
import ComputerList from './computer_table/ComputerList'
import ControllerDashboard from './computer_table/controller/ControllerDashboard'

function ComputersDashboard(props) {
    // Management control
    const [selectedComputers, setSelectedComputers] = useState([])
    // Display control
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const switchSelection = (computerName) => {
        if (selectedComputers.includes(computerName)) {
            setSelectedComputers(prevState => prevState.filter(computer => computer !== computerName))
        } else {
            setSelectedComputers(prevState => [computerName, ...prevState])
        }
    }

    const [deleteComputers] = useMutation(deletePC, {
        variables: {
            names: selectedComputers,
        },
        onCompleted: () => {
            setSelectedComputers([])
            setShowDeleteModal(false)
            props.onDelete()
        },
    })

    return (
        <div className={style.computersContainer}>
            <ControllerDashboard
                onControllerChange={(sorting, filter, search) => props.onControllerChange(sorting, filter, search)}
                onDelete={deleteComputers}
                showActions={() => !!selectedComputers.length}
            />
            <div className='dashboard'>
                <ComputerList
                    onComputerClick={props.onComputerClick}
                    switchSelection={switchSelection}
                    computers={props.computers}
                />
            </div>
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
  computers: PropTypes.array,
  onComputerClick: PropTypes.func.isRequired,
  onControllerChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}