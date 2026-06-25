export type STATUS = {
    _id: string
    yearsExperience: string
    projectsCompleted: string
    technologies: string
    happyClients: string
}

export type COMMON_STATUS_RESPONSE = {
    message: string
}

export type CREATE_STATUS_REQUEST = {
    yearsExperience: string
    projectsCompleted: string
    technologies: string
    happyClients: string
}

export type GET_STATUS_RESPONSE = {
    message: string
    result: STATUS[]
}

export type UPDATE_STATUS_REQUEST = {
    _id: string
    yearsExperience?: string
    projectsCompleted?: string
    technologies?: string
    happyClients?: string
}

export type DELETE_STATUS_REQUEST = {
    _id: string
}