import { APP_URL } from "@/constants/config"
import {
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_RESPONSE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_RESPONSE,
    GET_PROJECT_RESPONSE,
    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_RESPONSE
} from "@/type/Project"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const projectApi = createApi({

    reducerPath: "projectApi",

    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/project`,
        credentials: "include"
    }),

    tagTypes: ["project"],

    endpoints: (builder) => ({

        getProject: builder.query<GET_PROJECT_RESPONSE, void>({
            query: () => ({
                url: "/fetch-project",
                method: "GET"
            }),
            providesTags: ["project"]
        }),

        addProject: builder.mutation<CREATE_PROJECT_RESPONSE, CREATE_PROJECT_REQUEST>({
            query: (data) => {

                const formData = new FormData()

                formData.append("title", data.title)
                formData.append("description", data.description)
                formData.append("category", data.category)
                formData.append("technologies", data.technologies.join(","))
                formData.append("liveUrl", data.liveUrl)
                formData.append("githubUrl", data.githubUrl)

                if (data.images) {
                    formData.append("image", data.images)
                }

                return {
                    url: "/add-project",
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ["project"]
        }),

        updateProject: builder.mutation<UPDATE_PROJECT_RESPONSE, UPDATE_PROJECT_REQUEST>({
            query: (data) => {

                const formData = new FormData()

                if (data.title) {
                    formData.append("title", data.title)
                }

                if (data.description) {
                    formData.append("description", data.description)
                }

                if (data.category) {
                    formData.append("category", data.category)
                }

                if (data.technologies) {
                    formData.append("technologies", data.technologies.join(","))
                }

                if (data.liveUrl) {
                    formData.append("liveUrl", data.liveUrl)
                }

                if (data.githubUrl) {
                    formData.append("githubUrl", data.githubUrl)
                }

                if (data.images) {
                    formData.append("image", data.images)
                }

                return {
                    url: "/edit-project/" + data._id,
                    method: "PUT",
                    body: formData
                }
            },
            invalidatesTags: ["project"]
        }),

        deleteProject: builder.mutation<DELETE_PROJECT_RESPONSE, DELETE_PROJECT_REQUEST>({
            query: ({ _id }) => ({
                url: "/remove-project/" + _id,
                method: "DELETE",
            }),
            invalidatesTags: ["project"]
        }),

    })

})

export const {
    useGetProjectQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi