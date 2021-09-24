import { ApolloError, useMutation } from '@apollo/client'
import { Button, FormControl, Grid, InputAdornment, InputLabel, Select, TextField } from '@material-ui/core'
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined'
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import MemoryIcon from '@material-ui/icons/Memory'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import { ComputerType } from 'components/shared/enums'
import { InputError } from 'components/shared/types/errors'
import { createPC } from 'gql_api/mutations/createPC'
import { allPCQuery } from 'gql_api/queries/allPC'
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
    type: ComputerType
    ram?: number
}

interface AddComputerValidationResult {
    result: boolean
    reason?: string
}

interface ValidationState {
    [key: string]: AddComputerValidationResult
}

function ComputerInput(props: Props) {
    const [addComputerQuery, { error: addComputerError }] = useMutation<{ createPC: { name: string }, input: AddComputer }>(createPC)
    const formRef = useRef<HTMLDivElement>(null)
    const [validationState, setValidationState] = useState<ValidationState>({})
    const validators = {
        label: (input: string): AddComputerValidationResult => {
            const isValid = input.length > 3
            return {
                result: isValid,
                reason: isValid ? null : 'Minimum 3 characters',
            }
        },
        name: (input: string): AddComputerValidationResult => {
            const isValid = input.length > 3
            return {
                result: isValid,
                reason: isValid ? null : 'Minimum 3 characters',
            }
        },
        serial: (input: string): AddComputerValidationResult => {
            const isValid = input.length === 0 || input.length === 4
            return {
                result: isValid,
                reason: isValid ? null : 'Serial number consist of 4 numbers',
            }
        },
    }

    const validateInput = (input: AddComputer): boolean => {
        let newValidationState: ValidationState = {}
        Object.entries(input).forEach(entry => {
            const [key, value] = entry
            if (Object.keys(validators).includes(key)) {
                newValidationState[key] = validators[key](value)
            }
        })
        setValidationState(newValidationState)
        return !Object.values(newValidationState).some(item => !item.result)
    }

    const collectInput = (formElement: HTMLDivElement): AddComputer => {
        return {
            label: (formElement.querySelector('input#label') as HTMLInputElement).value,
            name: (formElement.querySelector('input#name') as HTMLInputElement).value,
            serial: (formElement.querySelector('input#serial') as HTMLInputElement).value,
            location: (formElement.querySelector('input#location') as HTMLInputElement).value,
            type: ComputerType[(formElement.querySelector('select#type') as HTMLInputElement).value],
            ram: parseInt((formElement.querySelector('input#ram') as HTMLInputElement).value),
        }
    }

    const addComputer = (): void => {
        const input = collectInput(formRef.current)
        if (!validateInput(input)) {
            return
        } else {
            addComputerQuery({
                variables: {
                    input: input,
                },
                refetchQueries: [allPCQuery],
            }).catch((e) => {
                e.graphQLErrors.forEach(err => {
                    if (err.__typename === 'InputError') {
                        const field = err.field
                        setValidationState(prevState => {
                            const newState = {...prevState}
                            newState[err.field] = {
                                result: false,
                                reason: err.message
                            }
                            return newState
                        })
                    }
                })
            })
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
                        error={validationState.serial && !validationState.serial.result}
                        helperText={validationState.serial ? validationState.serial.reason : ''}
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
                    <TextField
                        id='ram'
                        label='Memory'
                        type='number'
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>GB</InputAdornment>,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <MemoryIcon color='secondary'/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl style={{ width: 230 }}>
                        <InputLabel htmlFor='type'>Type</InputLabel>
                        <Select
                            required
                            native
                            inputProps={{
                                name: 'Type',
                                id: 'type',
                            }}
                        >
                            <option value={ComputerType.DESKTOP}>Desktop</option>
                            <option value={ComputerType.LAPTOP}>Laptop</option>
                        </Select>
                    </FormControl>
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
