import { ComputerType, FormFactor } from 'components/shared/enums'

type OS = {
    name: string,
    version?: string,
    architecture?: string
}

type CPU = {
    name: string,
    clock: string,
    cores: string,
    threads: string,
    socket?: string
}

type RAM = {
    size: number
    banks: { speed: number, capacity: number }[]
}

type Motherboard = {
    manufacturer: string
    product: string
    serial: string
}

type Videocard = {
    name: string
    resX: string
    resY: string
}


export type Computer = {
    type: ComputerType
    name: string
    domain?: string
    username?: string
    timezone?: string
    serial?: string
    ip?: string
    comment?: string
    label?: string
    user?: string
    location?: string
    updated?: string
    form_factor: FormFactor
    os: OS
    cpu: CPU
    ram: RAM
    motherboard: Motherboard
    videocard: Videocard
}

export interface ComputerVariables {
    name: string
}

export type ComputerBaseInfo = {
    name: string
    type: ComputerType
    label?: string
    serial?: string
    location?: string
}