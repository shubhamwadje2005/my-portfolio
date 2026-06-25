import { APP_URL } from "@/constants/config"
import { CREATE_EDUCATION_REQUEST, CREATE_EDUCATION_RESPONSE, DELETE_EDUCATION_REQUEST, DELETE_EDUCATION_RESPONSE, GET_EDUCATION_RESPONSE, UPDATE_EDUCATION_REQUEST, UPDATE_EDUCATION_RESPONSE } from "@/type/Education"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const educationApi = createApi({
    reducerPath: "educationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/education`,
        credentials: "include"
    }),
    tagTypes: ["education"],
    endpoints: (builder) => {
        return {
            getEducation: builder.query<GET_EDUCATION_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/fetch-education",
                        method: "GET"
                    }
                },
                providesTags: ["education"]
            }),
            addEducation: builder.mutation<CREATE_EDUCATION_RESPONSE, CREATE_EDUCATION_REQUEST>({
                query: userData => {
                    return {
                        url: "/add-education",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["education"]
            }),
            updateEducation: builder.mutation<UPDATE_EDUCATION_RESPONSE, UPDATE_EDUCATION_REQUEST>({
                query: userData => {
                    return {
                        url: "/edit-education/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["education"]
            }),
            deleteEducation: builder.mutation<DELETE_EDUCATION_RESPONSE, DELETE_EDUCATION_REQUEST>({
                query: ({ _id }) => {
                    return {
                        url: "/remove-education/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["education"]
            }),

        }
    }
})

export const {
    useGetEducationQuery,
    useAddEducationMutation,
    useUpdateEducationMutation,
    useDeleteEducationMutation
} = educationApi
