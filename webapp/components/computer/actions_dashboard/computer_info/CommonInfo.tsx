import { useMutation } from '@apollo/client'
import { Input, MenuItem, Select } from '@material-ui/core'
import {
    BaseProps,
    defaultNoDataMessage,
    skeletonText,
} from 'components/computer/actions_dashboard/computer_info/defaults'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { FormFactor } from 'core/enums'
import { updateComputer } from 'gql_api/mutations/updateComputer'
import { computerQuery } from 'gql_api/queries/computer'
import { computersQuery } from 'gql_api/queries/computers'
import { SnackbarContext } from 'pages'
import React, { useContext, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import style from 'styles/ActiveComputer.module.scss'

export interface Props extends BaseProps {
    id: string
    name: string
    user: string | null
    location: string | null
    formFactor: FormFactor
    username: string | null
    serial: string | null
    loading: boolean
}

interface commonInfoPayload {
    [key: string]: {
        value: any | null
        key: 'user' | 'location' | 'formFactor' | 'username' | 'serial'
    }
}

function CommonInfo(props: Props) {
    const { setState: setSnackbar } = useContext(SnackbarContext)
    const [editing, setEditing] = useState<string>(null)
    const [updateComputerQuery, { loading: updateLoading }] = useMutation(updateComputer, {
        refetchQueries: [computerQuery, computersQuery],
        onError: error => notifyError(error, setSnackbar),
        onCompleted: () => notifySuccess('Information updated!', setSnackbar),
    })

    const editBtn = <MdEdit
        className={style.edit}
        onClick={(event => setEditing(event.currentTarget.parentElement.parentElement.id))}
    />

    const editField = (value: any) => {
        return <Input
            defaultValue={value}
            autoFocus
            margin='dense'
            inputProps={{
                style: { textAlign: 'right' },
                onBlur: event => {
                    if (event.currentTarget.value === value || !event.currentTarget.value) {
                        setEditing(null)
                        return
                    }
                    let input = {}
                    input[event.currentTarget.parentElement.parentElement.id] = event.currentTarget.value
                    updateComputerQuery({ variables: { id: props.id, input: input } })
                },
            }}
        />
    }

    const selectField = (value: FormFactor, id: string) => {
        return (
            <Select
                defaultValue={value}
                onChange={event => {
                    if (event.target.value === value) {
                        setEditing(null)
                        return
                    }
                    let input = {}
                    input[id] = event.target.value
                    updateComputerQuery({ variables: { name: props.name, input: input } })
                    setEditing(null)
                }}
            >
                <MenuItem value={FormFactor.ATX}>{FormFactor.ATX}</MenuItem>
                <MenuItem value={FormFactor.mATX}>{FormFactor.mATX}</MenuItem>
            </Select>
        )
    }

    const formatValue = (value: string) => {
        if (props.loading || updateLoading) {
            return skeletonText
        } else {
            return <span>{editBtn} {value || defaultNoDataMessage}</span>
        }
    }

    const renderValue = (key: string, value: any) => {
        if (props.loading) return skeletonText
        switch (key) {
            case 'formFactor':
                return editing === key ? selectField(value, key) : formatValue(value)
            default:
                return editing === key ? editField(value) : formatValue(value)
        }
    }

    const computerCommonInfo: commonInfoPayload = {
        'User:': { value: props.user, key: 'user' },
        // 'Location:': { value: props.location, key: 'location' },
        'Form factor:': { value: props.formFactor, key: 'formFactor' },
        'Username:': { value: props.username, key: 'username' },
        'Serial number:': { value: props.serial, key: 'serial' },
    }

    return (
        <>
            {Object.entries(computerCommonInfo).map(([caption, item]) => {
                return <p id={item.key} key={item.key}>
                    <b>{caption} </b> {renderValue(item.key, item.value)}
                </p>
            })}
        </>
    )

}

export default CommonInfo