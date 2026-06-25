export type PROJECT = {
    _id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    technologies: string[],
    liveUrl: string,
    githubUrl: string
}



export type CREATE_PROJECT_REQUEST = {
    title: string,
    description: string,
    category: string,
    images?: File
    technologies: string[],
    liveUrl: string,
    githubUrl: string
}

export type CREATE_PROJECT_RESPONSE = {
    message: string
}




export type GET_PROJECT_RESPONSE = {
    message: string,
    result: PROJECT[]
}




export type UPDATE_PROJECT_REQUEST = {
    _id: string,
    title?: string,
    description?: string,
    category?: string,
    images?: File
    technologies?: string[],
    liveUrl?: string,
    githubUrl?: string
}


export type UPDATE_PROJECT_RESPONSE = {
    message: string
}





export type DELETE_PROJECT_REQUEST = {
    _id: string
}


export type DELETE_PROJECT_RESPONSE = {
    message: string
}