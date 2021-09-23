import { ComputerType, FormFactor } from 'components/shared/enums'

type OS = {
    name: string,
    architecture?: string
}

type CPU = {
    name: string,
    clock: string,
    cores: string,
    threads: string,
}

type Videocard = {
    name: string
    memory: number
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
    os?: OS
    cpu?: CPU
    ram?: number
    videocard?: Videocard
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