import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "../../config/env"
import { GET_PROJECT_RESPONSE } from "../types"

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/project` }),
    tagTypes: ["project"],
    endpoints: (builder) => {
        return {
            getProject: builder.query<GET_PROJECT_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/fetch-project",
                        method: "GET"
                    }
                },
                providesTags: ["project"]
            })
        }
    }
})

export const {
    useGetProjectQuery,
    useLazyGetProjectQuery
} = projectApi
