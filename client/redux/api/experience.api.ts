import { APP_URL } from "@/constants/config"
import { CREATE_EXPERIENCE_REQUEST, CREATE_EXPERIENCE_RESPONSE, DELETE_EXPERIENCE_REQUEST, DELETE_EXPERIENCE_RESPONSE, GET_EXPERIENCE_RESPONSE, UPDATE_EXPERIENCE_REQUEST, UPDATE_EXPERIENCE_RESPONSE } from "@/type/Experience"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const experienceApi = createApi({
    reducerPath: "experienceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/experience`,
        credentials: "include"
    }),
    tagTypes: ["experience"],
    endpoints: (builder) => {
        return {
            getExperience: builder.query<GET_EXPERIENCE_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/fetch-exprience",
                        method: "GET"
                    }
                },
                providesTags: ["experience"]
            }),
            addExperience: builder.mutation<CREATE_EXPERIENCE_RESPONSE, CREATE_EXPERIENCE_REQUEST>({
                query: userData => {
                    return {
                        url: "/add-exprience",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["experience"]
            }),
            UpdateExperience: builder.mutation<UPDATE_EXPERIENCE_RESPONSE, UPDATE_EXPERIENCE_REQUEST>({
                query: userData => {
                    return {
                        url: "/edit-experience/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["experience"]
            }),
            DeleteExperience: builder.mutation<DELETE_EXPERIENCE_RESPONSE, DELETE_EXPERIENCE_REQUEST>({
                query: ({ _id }) => {
                    return {
                        url: "/remove-experience/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["experience"]
            }),

        }
    }
})

export const {
    useGetExperienceQuery,
    useAddExperienceMutation,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation
} = experienceApi
