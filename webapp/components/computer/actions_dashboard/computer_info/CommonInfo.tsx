import { useMutation } from '@apollo/client'
import { Input } from '@material-ui/core'
import {
    BaseProps,
    defaultNoDataMessage,
    skeletonText,
} from 'components/computer/actions_dashboard/computer_info/defaults'
import { notifyError, notifySuccess } from 'components/shared/actions/notification'
import { FormFactor } from 'components/shared/enums'
import { updatePC } from 'gql_api/mutations/updatePC'
import { allPCQuery } from 'gql_api/queries/allPC'
import { getPCQuery } from 'gql_api/queries/getPC'
import { SnackbarContext } from 'pages'
import React, { useContext, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import style from 'styles/ActiveComputer.module.scss'

export interface Props extends BaseProps {
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
    const [updateComputer, { loading: updateLoading }] = useMutation(updatePC, {
        refetchQueries: [getPCQuery, allPCQuery],
        onError: error => notifyError(error, setSnackbar),
        onCompleted: () => notifySuccess('Information updated!', setSnackbar),
    })

    const editBtn = <MdEdit
        className={style.edit}
        onClick={(event => setEditing(event.currentTarget.parentElement.parentElement.id))}
    />

    const editField = (value: string) => <Input
        defaultValue={value}
        autoFocus
        margin='dense'
        inputProps={{
            style: { textAlign: 'right' },
            onBlur: event => {
                let input = {}
                input[event.currentTarget.parentElement.parentElement.id] = event.currentTarget.value
                updateComputer({ variables: { name: props.name, input: input } })
                setEditing(null)
            },
        }}
    />
    const formatValue = (value: string) => {
        if (props.loading || updateLoading) {
            return skeletonText
        } else {
            return <span>{editBtn} {value || defaultNoDataMessage}</span>
        }
    }

    const renderValue = (key: string, value: any) => {
        if (props.loading) return skeletonText
        return editing === key ? editField(value) : formatValue(value)
    }

    const computerCommonInfo: commonInfoPayload = {
        'User:': { value: props.user, key: 'user' },
        'Location:': { value: props.location, key: 'location' },
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