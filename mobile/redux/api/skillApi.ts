import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "../../config/env"
import { GET_SKILL_RESPONSE } from "../types"

export const skillApi = createApi({
    reducerPath: "skillApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/skill` }),
    tagTypes: ["skill"],
    endpoints: (builder) => {
        return {
            getSkill: builder.query<GET_SKILL_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/fetch-skill",
                        method: "GET"
                    }
                },
                providesTags: ["skill"]
            })
        }
    }
})

export const {
    useGetSkillQuery,
    useLazyGetSkillQuery
} = skillApi
