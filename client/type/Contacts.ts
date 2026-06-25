export type CREATE_CONTACT_REQUEST = {
    name: string,
    email: string,
    message: string,
    subject: string,
}

export type CREATE_CONTACT_RESPONSE = {
    message: string,
    result: {
        _id: string,
        name: string,
        email: string,
        message: string,
        subject: string,
        createdAt?: string,
        updatedAt?: string,
    }
}