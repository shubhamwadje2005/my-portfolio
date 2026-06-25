import { APP_URL } from "@/constants/config"
import { CREATE_ABOUT_REQUEST, CREATE_ABOUT_RESPONSE, DELETE_ABOUT_REQUEST, DELETE_ABOUT_RESPONSE, GET_ABOUT_RESPONSE, UPDATE_ABOUT_REQUEST, UPDATE_ABOUT_RESPONSE } from "@/type/About"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const aboutApi = createApi({
    reducerPath: "aboutApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/about`,
        credentials: "include"
    }),
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
            }),
            addAbout: builder.mutation<CREATE_ABOUT_RESPONSE, FormData>({
                query: aboutData => {
                    return {
                        url: "/create-about",
                        method: "POST",
                        body: aboutData,
                    }
                },
                invalidatesTags: ["about"]
            }),
            updateAbout: builder.mutation<
                UPDATE_ABOUT_RESPONSE,
                { id: string; formData: FormData }
            >({
                query: ({ id, formData }) => {
                    return {
                        url: "/update-about/" + id,
                        method: "PUT",
                        body: formData
                    }
                },
                invalidatesTags: ["about"]
            }),
            deleteAbout: builder.mutation<DELETE_ABOUT_RESPONSE, DELETE_ABOUT_REQUEST>({
                query: ({ _id }) => {
                    return {
                        url: "/delete-about/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["about"]
            }),

        }
    }
})

export const {
    useGetAboutQuery,
    useAddAboutMutation,
    useUpdateAboutMutation,
    useDeleteAboutMutation
} = aboutApi
