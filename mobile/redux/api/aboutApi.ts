import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "../../config/env"
import { GET_ABOUT_RESPONSE } from "../types"

export const aboutApi = createApi({
    reducerPath: "aboutApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${env.APP_URL}/api/about` }),
    tagTypes: ["about"],
    endpoints: (builder) => {
        return {
            getAbout: builder.query<GET_ABOUT_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/get-about",
                        method: "GET"
                    }
                },
                providesTags: ["about"]
            })
        }
    }
})

export const {
    useGetAboutQuery,
    useLazyGetAboutQuery
} = aboutApi
