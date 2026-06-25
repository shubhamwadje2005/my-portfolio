import { APP_URL } from "@/constants/config"
import { CREATE_CONTACT_REQUEST, CREATE_CONTACT_RESPONSE } from "@/type/Contacts"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/user`,
        credentials: "include"
    }),
    tagTypes: ["contact"],
    endpoints: (builder) => {
        return {
            createContact: builder.mutation<CREATE_CONTACT_RESPONSE, CREATE_CONTACT_REQUEST>({
                query: userData => {
                    return {
                        url: "/contact-data",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["contact"]
            }),

        }
    }
})

export const { useCreateContactMutation } = contactApi
