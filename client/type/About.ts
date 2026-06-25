export type PERSONAL = {
    _id?: string,
    dateOfBirth: string,
    location: string,
    email: string,
    phone: string,
    languages: string,
}

export type CREATE_ABOUT_REQUEST = {
    name: string,
    title: string,
    introduction: string,
    profileImage?: FileList,
    journey: string,
    currentWork: string,
    personal: PERSONAL[],
}

export type CREATE_ABOUT_RESPONSE = {
    message: string
}

export type GET_ABOUT_RESPONSE = {
    message: string
    result: {
        _id: string,
        name: string,
        title: string,
        introduction: string,
        journey: string,
        currentWork: string,
        profileImage: string,
        personal: PERSONAL[],

        createdAt?: string,
        updatedAt?: string,
    }
}


export type UPDATE_ABOUT_REQUEST = {
    _id: string,
    name?: string,
    title?: string,
    introduction?: string,
    journey?: string,
    currentWork?: string,
    personal?: string,
    profileImage?: FileList,
}

export type UPDATE_ABOUT_RESPONSE = {
    message: string
}

export type DELETE_ABOUT_REQUEST = {
    _id: string,
    profileImage?: File,
}

export type DELETE_ABOUT_RESPONSE = {
    message: string
}
