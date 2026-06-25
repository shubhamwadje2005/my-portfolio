import { APP_URL } from "@/constants/config"
import { COMMON_STATUS_RESPONSE, CREATE_STATUS_REQUEST, DELETE_STATUS_REQUEST, GET_STATUS_RESPONSE, UPDATE_STATUS_REQUEST } from "@/type/Status"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const statusApi = createApi({
    reducerPath: "statusApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/status`,
        credentials: "include"
    }),
    tagTypes: ["status"],
    endpoints: (builder) => {
        return {
            getStatus: builder.query<GET_STATUS_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/fetch-status",
                        method: "GET"
                    }
                },
                providesTags: ["status"]
            }),
            addStatus: builder.mutation<COMMON_STATUS_RESPONSE, CREATE_STATUS_REQUEST>({
                query: userData => {
                    return {
                        url: "/add-status",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["status"]
            }),
            updateStatus: builder.mutation<COMMON_STATUS_RESPONSE, UPDATE_STATUS_REQUEST>({
                query: userData => {
                    return {
                        url: "/edit-status/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["status"]
            }),
            deleteStatus: builder.mutation<COMMON_STATUS_RESPONSE, DELETE_STATUS_REQUEST>({
                query: ({ _id }) => {
                    return {
                        url: "/remove-status/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["status"]
            }),

        }
    }
})

export const {
    useGetStatusQuery,
    useAddStatusMutation,
    useUpdateStatusMutation,
    useDeleteStatusMutation,
} = statusApi
