import { APP_URL } from "@/constants/config"
import { SIGNIN_REQUEST, SIGNIN_RESPONSE } from "@/type/Admin"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { removeStorage, setStorage } from "../utils/authStorages"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/admin`,
        credentials: "include"
    }),
    tagTypes: ["Admin"],
    endpoints: (builder) => {
        return {
            loginAdmin: builder.mutation<SIGNIN_RESPONSE, SIGNIN_REQUEST>({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data: SIGNIN_RESPONSE) => {
                    setStorage(data)
                    return data
                },
                invalidatesTags: ["Admin"]
            }),
            logoutAdmin: builder.mutation<void, void>({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
                transformResponse: () => {
                    removeStorage()
                },
                invalidatesTags: ["Admin"]
            }),

        }
    }
})

export const {
    useLoginAdminMutation,
    useLogoutAdminMutation
} = adminApi
