// "use client"

// import React from "react"
// import { useGetAboutQuery } from "@/redux/api/about.api"
// import {
//     FaGithub,
//     FaLinkedin,
//     FaEnvelope,
//     FaPhoneAlt,
//     FaMapMarkerAlt,
// } from "react-icons/fa"

// const Footer = () => {
//     const { data, isLoading, isError } = useGetAboutQuery()

//     const aboutData = data?.result
//     const personal = aboutData?.personal?.[0]   // ✅ FIX

//     if (isLoading) {
//         return (
//             <footer className="bg-[#0b0b0b] text-white py-10 text-center">
//                 Loading...
//             </footer>
//         )
//     }

//     if (isError) {
//         return (
//             <footer className="bg-[#0b0b0b] text-red-500 py-10 text-center">
//                 Error loading data
//             </footer>
//         )
//     }

//     const fullName = aboutData?.name || "Shubham S Wadje"
//     const firstName = fullName.split(" ")[0]
//     const restName = fullName.split(" ").slice(1).join(" ")

//     return (
//         <footer className="bg-[#0b0b0b] text-gray-400 px-6 md:px-20 py-12">

//             <div className="grid md:grid-cols-3 gap-10 border-b border-zinc-800 pb-10">

//                 {/* LEFT */}
//                 <div>
//                     <h2 className="text-2xl font-semibold mb-3">
//                         <span className="text-white">{firstName}</span>{" "}
//                         <span className="text-orange-500">{restName}</span>
//                     </h2>

//                     <p className="text-sm leading-relaxed max-w-xs">
//                         {aboutData?.title}
//                     </p>
//                 </div>

//                 {/* CENTER */}
//                 <div>
//                     <h3 className="text-white font-semibold mb-4 text-lg">
//                         Contact Info
//                     </h3>

//                     <div className="space-y-3 text-sm">
//                         <div className="flex items-center gap-3">
//                             <FaEnvelope />
//                             <span>{personal?.email || "example@gmail.com"}</span>
//                         </div>

//                         <div className="flex items-center gap-3">
//                             <FaPhoneAlt />
//                             <span>{personal?.phone || "+91-XXXXXXXXXX"}</span>
//                         </div>

//                         <div className="flex items-center gap-3">
//                             <FaMapMarkerAlt />
//                             <span>{personal?.location || "Maharashtra, India"}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT */}
//                 <div>
//                     <h3 className="text-white font-semibold mb-4 text-lg">
//                         Follow Me
//                     </h3>

//                     <div className="flex gap-4">
//                         <a href="#" className="p-3 bg-zinc-900 rounded-full">
//                             <FaGithub size={18} />
//                         </a>

//                         <a href="#" className="p-3 bg-zinc-900 rounded-full">
//                             <FaLinkedin size={18} />
//                         </a>

//                         <a href={`mailto:${personal?.email}`} className="p-3 bg-zinc-900 rounded-full">
//                             <FaEnvelope size={18} />
//                         </a>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-center text-zinc-500 mt-6 text-sm">
//                 © {new Date().getFullYear()} {fullName}. All rights reserved.
//             </div>
//         </footer>
//     )
// }

// export default Footer



"use client"

import React from "react"
import { useGetAboutQuery } from "@/redux/api/about.api"
import { useTheme } from "next-themes"
import {

} from "react-icons/fa"
import { FaRegEnvelope } from "react-icons/fa6"
import { FiLinkedin, FiPhone } from "react-icons/fi"
import { LuGithub, LuMapPin } from "react-icons/lu"
import { useGetProjectQuery } from "@/redux/api/project.api"

const Footer = () => {
    const { data, isLoading, isError } = useGetAboutQuery()
    const { data: projectData } = useGetProjectQuery()
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const aboutData = data?.result
    const personal = aboutData?.personal?.[0]
    const firstProject = projectData?.result?.[0]

    if (isLoading) {
        return (
            <footer className="bg-black text-white py-10 text-center">
                Loading...
            </footer>
        )
    }

    if (isError) {
        return (
            <footer className="bg-black text-red-500 py-10 text-center">
                Error loading data
            </footer>
        )
    }

    const fullName = aboutData?.name || "Shubham S Wadje"
    const firstName = fullName.split(" ")[0]
    const restName = fullName.split(" ").slice(1).join(" ")

    // ✅ Theme based classes
    // const isDark = theme === "dark"
    const isDark = resolvedTheme === "dark"

    // return (
    //     <footer
    //         className={`px-6 md:px-20 py-12 transition-colors duration-300
    //         ${isDark ? "bg-[#0b0b0b] text-gray-400" : "bg-gray-100 text-gray-700"}
    //     `}
    //     >
    //         <div className="grid md:grid-cols-3 gap-10 border-b pb-10
    //             border-zinc-300 dark:border-zinc-800">

    //             {/* LEFT */}
    //             <div>
    //                 <h2 className="text-2xl font-semibold mb-3">
    //                     <span className={`${isDark ? "text-white" : "text-black"}`}>
    //                         {firstName}
    //                     </span>{" "}
    //                     <span className="text-orange-500">{restName}</span>
    //                 </h2>

    //                 <p className="text-sm leading-relaxed max-w-xs">
    //                     {aboutData?.title}
    //                 </p>
    //             </div>

    //             {/* CENTER */}
    //             <div>
    //                 <h3 className="font-semibold mb-4 text-lg">
    //                     Contact Info
    //                 </h3>

    //                 <div className="space-y-3 text-sm">
    //                     <div className="flex items-center gap-3">
    //                         <FaEnvelope />
    //                         <span>{personal?.email}</span>
    //                     </div>

    //                     <div className="flex items-center gap-3">
    //                         <FaPhoneAlt />
    //                         <span>{personal?.phone}</span>
    //                     </div>

    //                     <div className="flex items-center gap-3">
    //                         <FaMapMarkerAlt />
    //                         <span>{personal?.location}</span>
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* RIGHT */}
    //             <div>
    //                 <h3 className="font-semibold mb-4 text-lg">
    //                     Follow Me
    //                 </h3>

    //                 <div className="flex gap-4">
    //                     <a className="p-3 bg-zinc-900 text-white rounded-full">
    //                         <FaGithub size={18} />
    //                     </a>

    //                     <a className="p-3 bg-zinc-900 text-white rounded-full">
    //                         <FaLinkedin size={18} />
    //                     </a>

    //                     <a
    //                         href={`mailto:${personal?.email}`}
    //                         className="p-3 bg-zinc-900 text-white rounded-full"
    //                     >
    //                         <FaEnvelope size={18} />
    //                     </a>
    //                 </div>
    //             </div>
    //         </div>

    //         {/* Theme Toggle Button (Optional 🔥) */}
    //         {/* <div className="text-center mt-6">
    //             <button
    //                 onClick={() => setTheme(isDark ? "light" : "dark")}
    //                 className="px-4 py-2 border rounded-md text-sm"
    //             >
    //                 Switch to {isDark ? "Light" : "Dark"} Mode
    //             </button>
    //         </div> */}

    //         {/* BOTTOM */}
    //         <div className="text-center mt-5 text-sm">
    //             © {new Date().getFullYear()} {fullName}. All rights reserved.
    //         </div>
    //     </footer>
    // )
    return (
        <footer
            className={`transition-colors duration-300
        ${isDark ? "bg-[#0b0b0b] text-gray-400" : "bg-gray-100 text-gray-700"}
    `}
        >
            {/* Top Section with Content - Padding ithe dya */}
            <div className="px-6 md:px-20 py-12">
                <div className="grid md:grid-cols-3 gap-10">
                    {/* LEFT */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            <span className={`${isDark ? "text-white" : "text-black"}`}>
                                {firstName}
                            </span>{" "}
                            <span className="text-orange-500">{restName}</span>
                        </h2>
                        <p className="text-sm leading-relaxed max-w-xs">
                            {/* {aboutData?.title} */}
                            MERN Stack Developer with a passion for creating beautiful, responsive web applications.
                        </p>
                    </div>

                    {/* CENTER */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Contact Info</h3>
                        <div className="space-y-3 text-sm">
                            {/* <div className="flex items-center gap-3"><FaRegEnvelope /><span>{personal?.email}</span></div>
                            <div className="flex items-center gap-3"><FiPhone /><span>+91-{personal?.phone}</span></div> */}
                            <div className="flex items-center gap-3">
                                <FaRegEnvelope />

                                {personal?.email ? (
                                    <a
                                        href={`mailto:${personal.email}`}
                                        className="hover:text-orange-500"
                                    >
                                        {personal.email}
                                    </a>
                                ) : (
                                    <span
                                        onClick={() => alert("Email not available")}
                                        className="cursor-pointer hover:text-red-500"
                                    >
                                        No Email
                                    </span>
                                )}
                            </div>

                            {/* PHONE */}
                            <div className="flex items-center gap-3 cursor-pointer">
                                <FiPhone />
                                <a
                                    href={personal?.phone ? `tel:+91${personal.phone}` : "#"}
                                    onClick={(e) => {
                                        if (!personal?.phone) {
                                            e.preventDefault()
                                            alert("Phone number not available")
                                        }
                                    }}
                                    className="hover:text-orange-500"
                                >
                                    +91-{personal?.phone || "XXXXXXXXXX"}
                                </a>
                            </div>
                            <div className="flex items-center gap-3"><LuMapPin /><span>{personal?.location}</span></div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Follow Me</h3>
                        <div className="flex gap-4">
                            {/* GitHub Icon */}
                            <a
                                // href={firstProject?.githubUrl || "#"}
                                href="https://github.com/shubhamwadje2005"
                                target="_blank"
                                className="p-3 border border-zinc-800 bg-[#121212] text-gray-400 rounded-full transition-all duration-300 hover:border-orange-600 hover:text-white"
                            >
                                <LuGithub size={18} />
                            </a>

                            {/* LinkedIn Icon */}
                            <a
                                // href={aboutData?.linkedin || "#"}
                                href="https://www.linkedin.com/in/shubham-wadje-916a31317"
                                target="_blank"
                                className="p-3 border border-zinc-800 bg-[#121212] text-gray-400 rounded-full transition-all duration-300 hover:border-orange-600 hover:text-white"
                            >
                                <FiLinkedin size={18} />
                            </a>

                            {/* Email Icon */}
                            <a
                                href={`mailto:${personal?.email}`}
                                className="p-3 border border-zinc-800 bg-[#121212] text-gray-400 rounded-full transition-all duration-300 hover:border-orange-600 hover:text-white"
                            >
                                <FaRegEnvelope size={18} />
                            </a>
                        </div>
                    </div>
                    {/* <div>
                        <h3 className="font-semibold mb-4 text-lg">Follow Me</h3>
                        <div className="flex gap-4">
                            <a className="p-3 rounded-full"><LuGithub size={18} /></a>
                            <a className="p-3 rounded-full"><FiLinkedin size={18} /></a>
                            <a href={`mailto:${personal?.email}`} className="p-3 rounded-full"><FaRegEnvelope size={18} /></a>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* ✅ HI LINE FULL WIDTH HOIL (Container chya baher ahe) */}
            <div className="border-b border-zinc-300 dark:border-zinc-800 w-full"></div>

            {/* BOTTOM SECTION */}
            <div className="text-center py-8 text-sm">
                © {new Date().getFullYear()} {fullName}. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer