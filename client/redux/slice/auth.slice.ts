import { createSlice } from "@reduxjs/toolkit";
import { getStorage } from "../utils/authStorages";
import { adminApi } from "../api/admin.api";

type authtype = {
    admin: {
        name: string,
        email: string,
        mobile: string,
        _id: string,
        role: string
    } | null
}

const initialState: authtype = {
    admin: getStorage()
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
    },
    extraReducers: builder => builder
        .addMatcher(adminApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = payload.result
        })
        .addMatcher(adminApi.endpoints.logoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })

})

export default authSlice.reducer