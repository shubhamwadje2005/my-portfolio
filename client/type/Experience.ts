export type EXPERIENCE = {
    _id: string,
    role: string,
    company: string,
    period: string,
    description: string,
    responsibilities: string[],
    order: number,
}



export type CREATE_EXPERIENCE_REQUEST = {
    role: string,
    company: string,
    period: string,
    description: string,
    responsibilities: string[],
    order: number,
}
export type CREATE_EXPERIENCE_RESPONSE = {
    message: string
}



export type GET_EXPERIENCE_RESPONSE = {
    message: string,
    result: EXPERIENCE[],
}



export type UPDATE_EXPERIENCE_REQUEST = {
    _id: string,
    role: string,
    company: string,
    period: string,
    description: string,
    responsibilities: string[],
    order: number,
}

export type UPDATE_EXPERIENCE_RESPONSE = {
    message: string
}




export type DELETE_EXPERIENCE_REQUEST = {
    _id: string
}

export type DELETE_EXPERIENCE_RESPONSE = {
    message: string
}