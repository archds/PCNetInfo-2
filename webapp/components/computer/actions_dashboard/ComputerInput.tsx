import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined'
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import React, { useRef, useState } from 'react'
import { GrClose } from 'react-icons/gr'

export interface Props {
    resetComputerInput(): void
}

interface AddComputer {
    label: string
    name: string
    serial: string
    location: string
}

interface AddComputerValidation {
    [key: string]: {
        result: boolean
        reason?: string
    }
}

function ComputerInput(props: Props) {
    // const addComputer = useMutation()
    const formRef = useRef<HTMLDivElement>(null)
    const [validationState, setValidationState] = useState<AddComputerValidation>({})

    const validateInput = (input: AddComputer): boolean => {
        let validationResult: boolean = true
        let newValidationState: AddComputerValidation = {}
        Object.entries(input).forEach(entry => {
            const [key, value] = entry
            newValidationState[key] = {
                result: true,
                reason: ''
            }
            if (value.length < 3) {
                validationResult = false
                newValidationState[key] = {
                    result: false,
                    reason: 'Min 3 characters',
                }
            }
        })
        setValidationState(newValidationState)
        return validationResult
    }

    const collectInput = (formElement: HTMLDivElement): AddComputer => {
        let form: AddComputer = {
            label: (formElement.querySelector('input#label') as HTMLInputElement).value,
            name: (formElement.querySelector('input#name') as HTMLInputElement).value,
            serial: (formElement.querySelector('input#serial') as HTMLInputElement).value,
            location: (formElement.querySelector('input#location') as HTMLInputElement).value,
        }
        return form
    }

    const addComputer = (): void => {
        const input = collectInput(formRef.current)
        if (!validateInput(input)) {
            return
        }
    }


    return (
        <>
            <GrClose className='closeButton' onClick={props.resetComputerInput}/>
            <Grid container spacing={3} ref={formRef}>
                <Grid item xs={12}>
                    <h3>Add computer</h3>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        error={validationState.label && !validationState.label.result}
                        helperText={validationState.label ? validationState.label.reason : ''}
                        id='label'
                        label='Label'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <LabelOutlinedIcon color='secondary'/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        error={validationState.name && !validationState.name.result}
                        helperText={validationState.name ? validationState.name.reason : ''}
                        id='name'
                        label='Computer name'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <DnsOutlinedIcon color='secondary'/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id='serial'
                        label='Inventory number'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <ConfirmationNumberOutlinedIcon color='secondary'/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id='location'
                        label='Location'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <RoomOutlinedIcon color='secondary'/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant='contained' color='primary' disableElevation
                        onClick={addComputer}
                    >Add</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ComputerInput
