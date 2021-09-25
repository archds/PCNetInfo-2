import style from '/styles/ActiveComputer.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import { Input } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { notifyError, notifySuccess } from 'components/shared/actions/notification'
import { Computer, ComputerVariables } from 'components/shared/types/computers'
import { updatePC } from 'gql_api/mutations/updatePC'
import { allPCQuery } from 'gql_api/queries/allPC'
import { getPCQuery } from 'gql_api/queries/getPC'
import Image from 'next/image'
import { SnackbarContext } from 'pages'
import React, { useContext, useState } from 'react'
import { BsDisplayFill } from 'react-icons/bs'
import { FaMemory } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { MdEdit } from 'react-icons/md'
import { RiCpuLine, RiWindowsFill } from 'react-icons/ri'

export interface Props {
    computerName: string
    resetActiveComputer(): void
}

// TODO: computer type
// TODO: computer editing
function ActiveComputer(props: Props) {
    const { setState: setSnackbar } = useContext(SnackbarContext)
    const [editing, setEditing] = useState<string>(null)
    const { loading: computerLoading, data: computerData } = useQuery<{ getPC: Computer }, ComputerVariables>(
        getPCQuery,
        { variables: { name: props.computerName } },
    )
    const [updateComputer, { loading: updateLoading }] = useMutation(updatePC, {
        refetchQueries: [getPCQuery, allPCQuery],
        onError: error => notifyError(error, setSnackbar),
        onCompleted: () => notifySuccess('Information updated!', setSnackbar),
    })

    const skeletonText = <Skeleton variant='text' width={100}/>
    const editBtn = <MdEdit className={style.edit} onClick={(event => handleEdit(event))}/>
    const editField = (value: string) => <Input
        defaultValue={value}
        autoFocus
        margin='dense'
        inputProps={{
            style: { textAlign: 'right' },
            onBlur: event => {
                let input = {}
                input[event.currentTarget.parentElement.parentElement.id] = event.currentTarget.value
                updateComputer({ variables: { name: computerData.getPC.name, input: input } })
                setEditing(null)
            },
        }}
    />
    const valueField = (value: string) => <span>{editBtn} {value || 'No data'}</span>

    const computerCommonInfo = Object.entries({
        'User:': { value: computerLoading || updateLoading ? null : computerData.getPC.user, key: 'user' },
        'Location:': { value: computerLoading || updateLoading ? null : computerData.getPC.location, key: 'location' },
        'Form factor:': {
            value: computerLoading || updateLoading ? null : computerData.getPC.formFactor,
            key: 'formFactor',
        },
        'Username:': { value: computerLoading || updateLoading ? null : computerData.getPC.username, key: 'username' },
        'Serial number:': { value: computerLoading || updateLoading ? null : computerData.getPC.serial, key: 'serial' },
    }).map(([caption, item]) => {
        return <p id={item.key} key={item.key}>
            <b>{caption} </b> {updateLoading || computerLoading ? skeletonText : (editing === item.key ? editField(item.value) : valueField(item.value))}
        </p>
    })

    const computerOSInfo = () => {
        let content
        if (updateLoading || computerLoading) {
            content = skeletonText
        } else if (computerData.getPC.os) {
            content = `${computerData.getPC.os.name}, ${computerData.getPC.os.architecture}`
        } else {
            content = `No data`
        }
        return <p><RiWindowsFill/> {content}</p>
    }

    const computerRAMInfo = () => {
        let content
        if (updateLoading || computerLoading) {
            content = skeletonText
        } else if (computerData.getPC.ram) {
            content = ` ${computerData.getPC.ram} GB`
        } else {
            content = `No data`
        }
        return <p><FaMemory/> {content}</p>
    }

    const computerCPUInfo = () => {
        let content
        if (updateLoading || computerLoading) {
            content = skeletonText
        } else if (computerData.getPC.cpu) {
            content = ` ${computerData.getPC.cpu.name}\n
            Clock: ${computerData.getPC.cpu.clock} MHz\n
            Cores/Threads: ${computerData.getPC.cpu.cores}/${computerData.getPC.cpu.threads}`
        } else {
            content = `No data`
        }
        return <p><RiCpuLine/> {content}</p>
    }

    const computerVideocardInfo = () => {
        let content
        if (updateLoading || computerLoading) {
            content = skeletonText
        } else if (computerData.getPC.videocard) {
            content = `${computerData.getPC.videocard.name}, ${computerData.getPC.videocard.memory} GB`
        } else {
            content = `No data`
        }
        return <p><BsDisplayFill/> {content}</p>
    }

    const handleEdit = (event: React.MouseEvent) => {
        setEditing(event.currentTarget.parentElement.parentElement.id)
    }

    return (
        <>
            <GrClose className='closeButton' onClick={props.resetActiveComputer}/>
            <div className={style.activeComputer}>
                <div className={style.computerMainInfo}>
                    <div className={style.computerHardwareInfo}>
                        <div className={style.computerName}>
                            {computerLoading || updateLoading ? <Skeleton variant='rect' width={160} height={80}/> :
                                <Image src='/img/computer.png' width='180' height='100'/>}
                            <p className='text-center'>{computerLoading || updateLoading ? skeletonText : computerData.getPC.name}</p>
                        </div>
                        <div>
                            {computerOSInfo()}
                            {computerCPUInfo()}
                            {computerRAMInfo()}
                            {computerVideocardInfo()}
                        </div>
                    </div>
                    <div className={style.computerCommonInfo}>
                        <h3>{computerLoading || updateLoading ? skeletonText : computerData.getPC.label}</h3>
                        {computerCommonInfo}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveComputer
