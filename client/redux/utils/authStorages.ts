import { SIGNIN_RESPONSE } from "@/type/Admin";

export const setStorage = (data: SIGNIN_RESPONSE) => {
    if (typeof window === "undefined") {
        return
    }
    localStorage.setItem("ADMIN", JSON.stringify(data.result))
    // Set a client-side cookie for Next.js middleware to check session
    document.cookie = `ADMIN=true; path=/; max-age=${60 * 60 * 24}; SameSite=Lax; secure`;
}
export const getStorage = () => {
    if (typeof window === "undefined") {
        return
    }
    // Sync localStorage with cookie presence
    const hasCookie = document.cookie.split(";").some((item) => item.trim().startsWith("ADMIN="));
    if (!hasCookie) {
        localStorage.removeItem("ADMIN");
        return null;
    }
    try {
        const adminData = localStorage.getItem("ADMIN");
        return adminData ? JSON.parse(adminData) : null;
    } catch {
        return null;
    }
}
export const removeStorage = () => {
    if (typeof window === "undefined") {
        return
    }
    localStorage.removeItem("ADMIN")
    // Clear client-side cookie
    document.cookie = "ADMIN=; path=/; max-age=0; SameSite=Lax; secure";
}