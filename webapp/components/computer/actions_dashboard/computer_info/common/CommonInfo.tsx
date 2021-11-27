import { useMutation } from '@apollo/client'
import { BaseProps } from 'components/computer/actions_dashboard/computer_info/defaults'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { FormFactor } from 'core/enums'
import { updateComputer } from 'gql_api/mutations/updateComputer'
import { computerQuery } from 'gql_api/queries/computer'
import { computersQuery } from 'gql_api/queries/computers'
import { SnackbarContext } from 'pages'
import React, { useContext } from 'react'
import { EditText } from 'react-edit-text'
import 'react-edit-text/dist/index.css'
import commonStyle from './Common.module.scss'

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


function CommonInfo(props: Props) {
    const { setState: setSnackbar } = useContext(SnackbarContext)
    const [updateComputerQuery, { loading: updateLoading }] = useMutation(updateComputer, {
        refetchQueries: [computerQuery, computersQuery],
        onError: error => notifyError(error, setSnackbar),
        onCompleted: () => notifySuccess('Information updated!', setSnackbar),
    })

    const components = {
        username: props.loading ? null : (
            <EditText
                id='username-input'
                name='username'
                defaultValue={props.username}
                placeholder='No data'
                className={commonStyle.field}
                onSave={({ value }) => updateComputerQuery({
                    variables: { id: props.id, input: { username: value } },
                })}
            />
        ),
        user: props.loading ? null : (
            <EditText
                id='user-input'
                name='user'
                defaultValue={props.user}
                placeholder='No data'
                className={commonStyle.field}
                onSave={({ value }) => updateComputerQuery({
                    variables: { id: props.id, input: { user: value } },
                })}
                readonly={true}
            />
        ),
        serial: props.loading ? null : (
            <EditText
                id='serial-input'
                name='serial'
                defaultValue={props.serial}
                placeholder='No data'
                className={commonStyle.field}
                onSave={({ value }) => updateComputerQuery({
                    variables: { id: props.id, input: { serial: value } },
                })}
            />
        ),
    }


    return (
        <p>
            <div className={commonStyle.fieldContainer}>
                <b>User: </b> {components.user}
            </div>
            <div className={commonStyle.fieldContainer}>
                <b>Username: </b>{components.username}
            </div>
            <div className={commonStyle.fieldContainer}>
                <b>Serial number: </b> {components.serial}
            </div>
        </p>
    )

}

export default CommonInfo