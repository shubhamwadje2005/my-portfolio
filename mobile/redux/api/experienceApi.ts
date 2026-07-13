import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "../../config/env"
import { GET_EXPERIENCE_RESPONSE } from "../types"

export const experienceApi = createApi({
    reducerPath: "experienceApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/experience` }),
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
            })
        }
    }
})

export const {
    useGetExperienceQuery,
    useLazyGetExperienceQuery
} = experienceApi
