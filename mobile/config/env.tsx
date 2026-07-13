export const env = {
    LOCAL_URL: process.env.EXPO_PUBLIC_LOCAL_URL,
    LIVE_URL: process.env.EXPO_PUBLIC_LIVE_URL,
    NODE_URL: process.env.EXPO_PUBLIC_NODE_ENV,
    APP_URL: process.env.EXPO_PUBLIC_NODE_ENV === "production"
        ? process.env.EXPO_PUBLIC_LIVE_URL
        : process.env.EXPO_PUBLIC_LOCAL_URL
}