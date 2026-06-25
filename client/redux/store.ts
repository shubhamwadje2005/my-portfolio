import { configureStore } from "@reduxjs/toolkit";
import { aboutApi } from "./api/about.api";
import { useSelector } from "react-redux";
import { contactApi } from "./api/contact.api";
import { educationApi } from "./api/education.api";
import { experienceApi } from "./api/experience.api";
import { projectApi } from "./api/project.api";
import { skillApi } from "./api/skill.api";
import { statusApi } from "./api/status.api";
import { adminApi } from "./api/admin.api";
import authSlice from './slice/auth.slice'

const reduxStore = configureStore({
    reducer: {
        [aboutApi.reducerPath]: aboutApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [educationApi.reducerPath]: educationApi.reducer,
        [experienceApi.reducerPath]: experienceApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer,
        [statusApi.reducerPath]: statusApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authSlice,
    },

    devTools: process.env.NEXT_PUBLIC_ENV !== "production",
    middleware: def => def().concat(aboutApi.middleware, contactApi.middleware, educationApi.middleware, experienceApi.middleware, projectApi.middleware, skillApi.middleware, statusApi.middleware, adminApi.middleware)
})

type RootType = ReturnType<typeof reduxStore.getState>
export const useAppSelector = useSelector.withTypes<RootType>()

export default reduxStore