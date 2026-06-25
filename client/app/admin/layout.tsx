// import Link from 'next/link'
// import React from 'react'

// const layout = ({ children }: { children: React.ReactNode }) => {
//     return <>
//         {/* <div className="p-10">

//             <div className="flex justify-between items-center">
//                 <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//                 <button className="border px-4 py-2 rounded">
//                     Logout
//                 </button>
//             </div>

//             <p className="text-gray-500 mt-2">
//                 Manage your portfolio content
//             </p>

//             <div className="flex gap-6 mt-6 border-b pb-3">

//                 <Link href="/admin/adminprojects">Projects</Link>
//                 <Link href="/admin/adminskills">Skills</Link>
//                 <Link href="/admin/adminstatus">Stats</Link>
//                 <Link href="/admin/adminabout">About</Link>

//             </div>

//             <div className="mt-8">
//                 {children}
//             </div>

//         </div> */}


//         <div className="max-w-6xl mx-auto p-8">

//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//                     <p className="text-gray-500 text-sm">
//                         Manage your portfolio content
//                     </p>
//                 </div>

//                 <button className="border px-4 py-2 rounded-md text-sm">
//                     Logout
//                 </button>
//             </div>

//             {/* Tabs */}
//             <div className="flex gap-6 mt-6 border-b pb-2 text-sm">
//                 <Link href="/admin/adminprojects">Projects</Link>
//                 <Link href="/admin/adminexperience">Experiences</Link>
//                 <Link href="/admin/adminskills">Skills</Link>
//                 <Link href="/admin/adminabout">About</Link>
//                 <Link href="/admin/adminstatus">Stats</Link>
//             </div>

//             {/* Content */}
//             <div className="mt-8">
//                 {children}
//             </div>
//         </div>
//     </>
// }

// export default layout


"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Footer from "../_components/Footer"
import { useLogoutAdminMutation } from "@/redux/api/admin.api"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

const layout = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname()
    const [Logout, { isLoading }] = useLogoutAdminMutation()
    const router = useRouter()

    // const [isAuth, setIsAuth] = useState(false)

    // useEffect(() => {
    //     const token = document.cookie.includes("ADMIN")
    //     if (!token) {
    //         setIsAuth(false)
    //         router.push("/login")
    //     } else {
    //         setIsAuth(true)
    //     }
    // }, [])

    // if (!isAuth) {
    //     return <div className="flex justify-center items-center h-screen">
    //         Loading...
    //     </div>
    // }
    const handleLogout = async () => {
        try {
            await Logout().unwrap()
            toast.success("logout success")
            router.refresh()
            router.push("/")
        } catch (error) {
            console.log(error)
            toast.error("unable to logout")
        }
    }

    const tabs = [
        { name: "Home", path: "/admin/" },
        { name: "About", path: "/admin/adminabout" },
        { name: "Projects", path: "/admin/adminprojects" },
        { name: "Education", path: "/admin/admineducation" },
        { name: "Experiences", path: "/admin/adminexperience" },
        { name: "Skills", path: "/admin/adminskills" },
        { name: "Stats", path: "/admin/adminstatus" },
    ]

    return <>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Manage your portfolio content
                    </p>
                </div>

                {/* <button className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto">
                    Logout
                </button> */}
                <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto flex items-center justify-center gap-2"
                >
                    {isLoading && <Spinner />}
                    {isLoading ? "Logging out..." : "Logout"}
                </button>
            </div>

            {/* Tabs */}
            <div className="mt-6 overflow-x-auto">
                <div className="flex gap-2 bg-gray-900 p-1 rounded-xl w-max">

                    {tabs.map((tab) => (
                        <Link
                            key={tab.path}
                            href={tab.path}
                            className={`whitespace-nowrap px-4 py-1.5 text-sm rounded-lg transition 
                            ${pathname === tab.path
                                    ? "bg-black shadow text-white"
                                    : "text-gray-100 hover:text-white"
                                }`}
                        >
                            {tab.name}
                        </Link>
                    ))}

                </div>
            </div>

            {/* Content */}
            <div className="mt-6 sm:mt-8">
                {children}
            </div>

        </div>

        <Footer />
    </>
}

export default layout



// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import React from "react"

// const layout = ({ children }: { children: React.ReactNode }) => {

//     const pathname = usePathname()

//     const tabs = [
//         { name: "Home", path: "/admin/" },
//         { name: "About", path: "/admin/adminabout" },
//         { name: "Projects", path: "/admin/adminprojects" },
//         { name: "Education", path: "/admin/admineducation" },
//         { name: "Experiences", path: "/admin/adminexperience" },
//         { name: "Skills", path: "/admin/adminskills" },
//         { name: "Stats", path: "/admin/adminstatus" },
//     ]

//     return <>
//         <div className="max-w-6xl mx-auto p-8">

//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//                     <p className="text-gray-500 text-sm">
//                         Manage your portfolio content
//                     </p>
//                 </div>

//                 <button className="border px-4 py-2 rounded-md text-sm">
//                     Logout
//                 </button>
//             </div>

//             {/* Tabs */}
//             <div className="mt-6">
//                 <div className="flex gap-2 bg-gray-900 p-1 rounded-xl w-fit">

//                     {tabs.map((tab) => (
//                         <Link
//                             key={tab.path}
//                             href={tab.path}
//                             className={`px-4 py-1.5 text-sm rounded-lg transition
//                             ${pathname === tab.path
//                                     ? "bg-black shadow text-white"
//                                     : "text-gray-100 hover:text-white"
//                                 }`}
//                         >
//                             {tab.name}
//                         </Link>
//                     ))}

//                 </div>
//             </div>

//             {/* Content */}
//             <div className="mt-8">
//                 {children}
//             </div>

//         </div>
//     </>
// }

// export default layout
