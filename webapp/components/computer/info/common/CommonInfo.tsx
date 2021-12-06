import { ComputerDocument, ComputersDocument, FormFactor, useUpdateComputerMutation } from 'api/generated/graphql'
import commonStyle from 'components/computer/info/common/Common.module.scss'
import { BaseProps } from 'components/shared/defaults'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { SnackbarContext } from 'pages/_app'
import React, { useContext } from 'react'
import { EditText } from 'react-edit-text'
import 'react-edit-text/dist/index.css'

export interface Props extends BaseProps {
    id: string
    name: string
    // user: string | null
    location: string | null
    formFactor: FormFactor
    username: string | null
    serial: string | null
    loading: boolean
}


function CommonInfo(props: Props) {
    const { setState: setSnackbar } = useContext(SnackbarContext)
    const [updateComputerQuery, { loading: updateLoading }] = useUpdateComputerMutation({
        refetchQueries: [ComputerDocument, ComputersDocument],
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
                // defaultValue={props.user}
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