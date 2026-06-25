export type EDUCATION = {
    _id: string,
    degree: string,
    university: string,
    location: string,
    startYear: number,
    endYear: number
}


export type CREATE_EDUCATION_REQUEST = {
    degree: string,
    university: string,
    location: string,
    startYear: number,
    endYear: number
}

export type CREATE_EDUCATION_RESPONSE = {
    message: string
}



export type GET_EDUCATION_RESPONSE = {
    message: string
    result: EDUCATION[]
}


export type UPDATE_EDUCATION_REQUEST = {
    _id: string,
    degree?: string,
    university?: string,
    location?: string,
    startYear?: number,
    endYear?: number
}

export type UPDATE_EDUCATION_RESPONSE = {
    message: string
}



export type DELETE_EDUCATION_REQUEST = {
    _id: string,
}

export type DELETE_EDUCATION_RESPONSE = {
    message: string
}
