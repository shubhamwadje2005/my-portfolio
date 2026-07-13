import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "../../config/env"
import { GET_EDUCATION_RESPONSE } from "../types"

export const educationApi = createApi({
    reducerPath: "educationApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/education` }),
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
            })
        }
    }
})

export const {
    useGetEducationQuery,
    useLazyGetEducationQuery
} = educationApi
