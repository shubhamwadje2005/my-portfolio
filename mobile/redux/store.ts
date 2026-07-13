import { configureStore } from '@reduxjs/toolkit';
import { aboutApi } from './api/aboutApi';
import { projectApi } from './api/projectApi';
import { skillApi } from './api/skillApi';
import { experienceApi } from './api/experienceApi';
import { educationApi } from './api/educationApi';

const store = configureStore({
    reducer: {
        [aboutApi.reducerPath]: aboutApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [skillApi.reducerPath]: skillApi.reducer,
        [experienceApi.reducerPath]: experienceApi.reducer,
        [educationApi.reducerPath]: educationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            aboutApi.middleware,
            projectApi.middleware,
            skillApi.middleware,
            experienceApi.middleware,
            educationApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
