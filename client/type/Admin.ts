export type SIGNIN_REQUEST = {
    email: string,
    password: string,
}
export type SIGNIN_RESPONSE = {
    message: string,
    result: {
        name: string,
        email: string,
        mobile: string,
        _id: string,
        role: string
    }
}