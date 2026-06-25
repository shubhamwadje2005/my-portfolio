
export type SKILL = {
    _id: string,
    skillName: string,
    category: string,
    icon: string,
    level: number,
    order: number,
}



export type CREATE_SKILL_REQUEST = {
    skillName: string,
    category: string,
    icon: string,
    level: number,
    order: number,
}

export type CREATE_SKILL_RESPONSE = {
    message: string
}



export type GET_SKILL_RESPONSE = {
    message: string,
    result: SKILL[]
}



export type UPDATE_SKILL_REQUEST = {
    _id: string,
    skillName: string,
    category: string,
    icon: string,
    level: number,
    order: number,
}


export type UPDATE_SKILL_RESPONSE = {
    message: string
}




export type DELETE_SKILL_REQUEST = {
    _id: string
}

export type DELETE_SKILL_RESPONSE = {
    message: string
}