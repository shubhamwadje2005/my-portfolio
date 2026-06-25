import { APP_URL } from "@/constants/config"
import { CREATE_SKILL_REQUEST, CREATE_SKILL_RESPONSE, DELETE_SKILL_REQUEST, DELETE_SKILL_RESPONSE, GET_SKILL_RESPONSE, UPDATE_SKILL_REQUEST, UPDATE_SKILL_RESPONSE } from "@/type/Skill"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const skillApi = createApi({
    reducerPath: "skillApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${APP_URL}/api/skill`,
        credentials: "include"
    }),
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
            }),
            addSkill: builder.mutation<CREATE_SKILL_RESPONSE, CREATE_SKILL_REQUEST>({
                query: userData => {
                    return {
                        url: "/add-skill",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["skill"]
            }),
            updateSkill: builder.mutation<UPDATE_SKILL_RESPONSE, UPDATE_SKILL_REQUEST>({
                query: userData => {
                    return {
                        url: "/edit-skill/" + userData._id,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["skill"]
            }),
            deleteSkill: builder.mutation<DELETE_SKILL_RESPONSE, DELETE_SKILL_REQUEST>({
                query: ({ _id }) => {
                    return {
                        url: "/remove-skill/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["skill"]
            }),

        }
    }
})

export const {
    useGetSkillQuery,
    useAddSkillMutation,
    useUpdateSkillMutation,
    useDeleteSkillMutation
} = skillApi
