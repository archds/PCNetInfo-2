import { ComputerDocument, ComputersDocument, FormFactor, useUpdateComputerMutation } from 'api/generated/graphql'
import commonStyle from 'components/computer/info/common/Common.module.scss'
import { BaseProps, skeletonText } from 'components/shared/defaults'
import { notifyError, notifySuccess } from 'core/actions/notification'
import { SnackbarContext } from 'pages/_app'
import React, { useContext } from 'react'
import { EditText } from 'react-edit-text'
import 'react-edit-text/dist/index.css'
import { Box, Typography } from '@mui/material'

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
    const [updateComputerQuery] = useUpdateComputerMutation({
        refetchQueries: [ComputerDocument, ComputersDocument],
        onError: error => notifyError(error, setSnackbar),
        onCompleted: () => notifySuccess('Information updated!', setSnackbar)
    })

    const editable: { [K in keyof Props]?: JSX.Element } = {}
    const editableFields: Array<keyof Props> = ['username', 'serial']

    editableFields.map(prop => {
        editable[prop] = props.loading ? (
            skeletonText
        ) : (
            <EditText
                id={`${prop}-input`}
                name={prop}
                defaultValue={props[prop] as string}
                className={commonStyle.field}
                style={{ fontSize: '16px', font: 'inherit' }}
                onSave={({ value }) => {
                    let input = {}
                    input[prop] = value
                    updateComputerQuery({
                        variables: { id: props.id, input: { ...input } }
                    })
                }}
            />
        )
    })

    const FieldBox = ({ children }) => <Box sx={{ display: 'flex', alignItems: 'center' }}>{children}</Box>

    return (
        <Typography>
            <FieldBox>
                <b>Username: </b>
                {editable.username}
            </FieldBox>
            <FieldBox>
                <b>Serial number: </b> {editable.serial}
            </FieldBox>
        </Typography>
    )
}

export default CommonInfo
