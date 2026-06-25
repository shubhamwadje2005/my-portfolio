// "use client"

// import React, { useEffect, useState } from "react"

// import { CREATE_EXPERIENCE_REQUEST, EXPERIENCE } from "@/type/Experience"
// import { useAddExperienceMutation, useDeleteExperienceMutation, useGetExperienceQuery, useUpdateExperienceMutation } from "@/redux/api/experience.api"
// import { BsThreeDots } from "react-icons/bs"

// const ExperienceAdmin = () => {

//     const { data, refetch } = useGetExperienceQuery()

//     const [deleteExperience] = useDeleteExperienceMutation()
//     const [updateExperience] = useUpdateExperienceMutation()
//     const [createExperience] = useAddExperienceMutation()

//     const [Experience, setExperience] = useState<EXPERIENCE[]>([])
//     const [open, setOpen] = useState(false)
//     const [menuId, setMenuId] = useState<string | null>(null)
//     const [editId, setEditId] = useState<string | null>(null)

//     const [form, setForm] = useState<CREATE_EXPERIENCE_REQUEST>({
//         role: "",
//         company: "",
//         period: "",
//         description: "",
//         responsibilities: [],
//         order: 0
//     })

//     useEffect(() => {
//         if (data?.result) {
//             setExperience(data.result)
//         }
//     }, [data])

//     const resetForm = () => {
//         setForm({
//             role: "",
//             company: "",
//             period: "",
//             description: "",
//             responsibilities: [],
//             order: 0
//         })
//         setEditId(null)
//     }

//     const handleSave = async () => {
//         if (editId) {
//             await updateExperience({
//                 _id: editId,
//                 ...form
//             }).unwrap()
//         } else {
//             await createExperience(form).unwrap()
//         }

//         setOpen(false)
//         resetForm()
//         refetch()
//     }

//     const handleDelete = async (id: string) => {
//         try {
//             await deleteExperience({ _id: id }).unwrap()
//             refetch()
//             setMenuId(null)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (

//         <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-0">

//             <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8">

//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">

//                     <h2 className="text-lg sm:text-xl font-semibold text-white">
//                         Experience
//                     </h2>

//                     <button
//                         onClick={() => {
//                             resetForm()
//                             setOpen(true)
//                         }}
//                         className="bg-black text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
//                     >
//                         + Add Experience
//                     </button>

//                 </div>

//                 {/* Table */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-sm min-w-[600px]">

//                         <thead className="border-b border-zinc-800 text-gray-500 uppercase text-xs tracking-wider">
//                             <tr>
//                                 <th className="text-left py-3">Role</th>
//                                 <th className="text-left py-3">Company</th>
//                                 <th className="text-left py-3">Description</th>
//                                 <th className="text-right py-3 pr-2">Actions</th>
//                             </tr>
//                         </thead>

//                         <tbody>

//                             {Experience.map((p) => (

//                                 <tr
//                                     key={p._id}
//                                     className="border-b border-zinc-900 hover:bg-zinc-800/40 transition"
//                                 >

//                                     {/* Role */}
//                                     <td className="py-4 text-white font-medium">
//                                         {p.role}
//                                     </td>

//                                     {/* Company */}
//                                     <td className="py-4 text-gray-400">
//                                         {p.company}
//                                     </td>

//                                     {/* Description */}
//                                     <td className="py-4 text-gray-500 max-w-[250px] truncate">
//                                         {p.description}
//                                     </td>

//                                     {/* Actions */}
//                                     <td className="py-4 text-right relative">

//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 setMenuId(menuId === p._id ? null : p._id)
//                                             }}
//                                             className="text-gray-500 hover:text-white text-xl px-2"
//                                         >
//                                             <BsThreeDots />
//                                         </button>

//                                         {/* Dropdown */}
//                                         {menuId === p._id && (
//                                             <div className="absolute right-0 mt-2 w-36 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">

//                                                 <button
//                                                     onClick={() => {
//                                                         setEditId(p._id)
//                                                         setForm({
//                                                             role: p.role,
//                                                             company: p.company,
//                                                             description: p.description,
//                                                             period: p.period,
//                                                             responsibilities: p.responsibilities,
//                                                             order: p.order,
//                                                         })
//                                                         setMenuId(null)
//                                                         setOpen(true)
//                                                     }}
//                                                     className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800 rounded-t-lg"
//                                                 >
//                                                     Edit
//                                                 </button>

//                                                 <button
//                                                     onClick={() => handleDelete(p._id)}
//                                                     className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 rounded-b-lg"
//                                                 >
//                                                     Delete
//                                                 </button>

//                                             </div>
//                                         )}

//                                     </td>

//                                 </tr>

//                             ))}

//                         </tbody>

//                     </table>
//                 </div>
//             </div>

//             {/* Modal */}
//             {open && (

//                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3">

//                     <div className="bg-zinc-900 p-4 sm:p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

//                         {/* <h3 className="text-white text-lg sm:text-xl font-semibold mb-6">
//                             {editId ? "Edit Project" : "Add Project"}
//                         </h3> */}
//                         <div className="mb-6">
//                             <h3 className="text-white text-lg sm:text-xl font-semibold ">
//                                 {editId ? "Edit Experience" : "Add Experience"}
//                             </h3>
//                             <p className="text-sm text-gray-400 mt-1">
//                                 Fill in the details for the new experience.
//                             </p>
//                         </div>

//                         {/* Role */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Role</label>
//                             <input
//                                 type="text"
//                                 placeholder="e.g., MERN Stack Developer"
//                                 value={form.role}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) => setForm({ ...form, role: e.target.value })}
//                             />
//                         </div>

//                         {/* Company */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Company</label>
//                             <input
//                                 placeholder="e.g., Google"
//                                 type="text"
//                                 value={form.company}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) => setForm({ ...form, company: e.target.value })}
//                             />
//                         </div>

//                         {/* Period */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Period</label>
//                             <input
//                                 placeholder="Jan 2023 - Jul 2023"
//                                 value={form.period}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) => setForm({ ...form, period: e.target.value })}
//                             />
//                         </div>

//                         {/* Description */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Description</label>
//                             <textarea
//                                 value={form.description}
//                                 placeholder="e.g., Like Example Description..."
//                                 rows={4}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                             />
//                         </div>

//                         {/* Responsibilities */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Responsibilities</label>
//                             <textarea
//                                 value={form.responsibilities.join(",")}
//                                 placeholder="e.g., Developed APIs, Managed database, Built UI"
//                                 rows={4}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         responsibilities: e.target.value.split(",")
//                                     })
//                                 }
//                             />
//                         </div>

//                         {/* Order */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Order</label>
//                             <input
//                                 type="number"
//                                 value={form.order}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) =>
//                                     setForm({ ...form, order: Number(e.target.value) })
//                                 }
//                             />
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

//                             <button
//                                 onClick={() => {
//                                     setOpen(false)
//                                     resetForm()
//                                 }}
//                                 className="px-5 py-2 rounded-full bg-black text-white border border-zinc-700 w-full sm:w-auto"
//                             >
//                                 Cancel Experience
//                             </button>

//                             <button
//                                 onClick={handleSave}
//                                 className="px-6 py-2 rounded-full bg-white text-black w-full sm:w-auto"
//                             >
//                                 {editId ? "Update Experience" : "Save Experience"}
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>
//     )
// }

// export default ExperienceAdmin







"use client"

import React, { useEffect, useState } from "react"
import { CREATE_ABOUT_REQUEST, PERSONAL, UPDATE_ABOUT_REQUEST } from "@/type/About"
import {
    useAddAboutMutation,
    useDeleteAboutMutation,
    useGetAboutQuery,
    useUpdateAboutMutation
} from "@/redux/api/about.api"

import { BsThreeDots } from "react-icons/bs"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// ------------------ SCHEMA ------------------
const defaultPersonal = {
    _id: "",
    dateOfBirth: "",
    location: "",
    email: "",
    phone: "",
    languages: ""
}

const personalSchema = z.object({
    dateOfBirth: z.string().min(1),
    location: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    languages: z.string().min(1),
})

const aboutSchema = z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    introduction: z.string().min(1),
    journey: z.string().min(1),
    currentWork: z.string().min(1),
    profileImage: z
        .any()
        .refine(
            (file) =>
                !file ||
                file.length === 0 ||
                file[0] instanceof File,
            "Invalid file"
        )
        .optional(),
    personal: z.array(personalSchema)
}) satisfies z.ZodType<CREATE_ABOUT_REQUEST>

// ------------------ COMPONENT ------------------
const AboutAdmin = () => {

    const { data, refetch } = useGetAboutQuery()

    const [deleteAbout, { isLoading: deleteLoading }] = useDeleteAboutMutation()
    const [updateAbout, { isLoading: updateLoading }] = useUpdateAboutMutation()
    const [createAbout, { isLoading: createLoading }] = useAddAboutMutation()

    const [about, setAbout] = useState<any>(null)
    const [open, setOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)

    // ------------------ FORM ------------------
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<CREATE_ABOUT_REQUEST>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
            name: "",
            title: "",
            introduction: "",
            journey: "",
            currentWork: "",
            personal: [defaultPersonal],
        }
    })
    const loading = updateLoading || createLoading
    const personalList = (watch("personal") || [defaultPersonal]) as PERSONAL[]
    const personalFields: (keyof PERSONAL)[] = [
        "dateOfBirth",
        "location",
        "email",
        "phone",
        "languages"
    ]
    // ------------------ LOAD DATA ------------------
    useEffect(() => {
        const item = data?.result; // safe
        if (!item) return;

        setAbout(item);

        let personalData = item.personal;
        if (!Array.isArray(personalData)) {
            personalData = [personalData || defaultPersonal];
        }

        reset({
            name: item.name || "",
            title: item.title || "",
            introduction: item.introduction || "",
            journey: item.journey || "",
            currentWork: item.currentWork || "",
            personal: (personalData.length ? personalData : [defaultPersonal]) as PERSONAL[],
        });
        setPreview(item.profileImage || null)
    }, [data, reset]);

    // ------------------ SAVE ------------------
    const handleSave = async (values: CREATE_ABOUT_REQUEST) => {
        try {
            const formData = new FormData()

            // -------- BASIC FIELDS --------
            formData.append("name", values.name)
            formData.append("title", values.title)
            formData.append("introduction", values.introduction)
            formData.append("journey", values.journey)
            formData.append("currentWork", values.currentWork)

            // -------- PERSONAL (IMPORTANT FIX) --------
            if (values.personal && values.personal.length > 0) {
                formData.append("personal", JSON.stringify(values.personal))
            }

            // -------- IMAGE --------
            if (values.profileImage && values.profileImage[0]) {
                formData.append("profileImage", values.profileImage[0])
            }

            // -------- API CALL --------
            if (about?._id) {
                await updateAbout({
                    id: about._id,
                    formData: formData
                }).unwrap()
            } else {
                await createAbout(formData).unwrap()
            }

            // -------- SUCCESS --------
            reset({
                name: "",
                title: "",
                introduction: "",
                journey: "",
                currentWork: "",
                personal: [defaultPersonal],
                profileImage: undefined
            })

            setOpen(false)
            refetch()

        } catch (err) {
            console.log("SAVE ERROR:", err)
        }
    }

    // ------------------ DELETE ------------------
    const handleDelete = async () => {
        try {
            if (!about?._id) return

            await deleteAbout({ _id: about._id }).unwrap()
            setAbout(null)
            refetch()
        } catch (err) {
            console.log("DELETE ERROR:", err)
        }
    }

    // ------------------ UI ------------------
    return (
        <div className="max-w-5xl mx-auto mt-6 sm:mt-10 sm:px- border rounded-2xl">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <h2 className="text-lg sm:text-xl text-white font-semibold">About</h2>

                    <button
                        // onClick={() => setOpen(true)}
                        onClick={() => {
                            if (!about) {
                                reset({
                                    name: "",
                                    title: "",
                                    introduction: "",
                                    journey: "",
                                    currentWork: "",
                                    personal: [defaultPersonal],
                                })
                                setPreview(null)
                            } else {
                                setPreview(about.profileImage)
                            }
                            setOpen(true)
                        }}
                        className="bg-black text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
                    >
                        {about ? "Edit About" : "+ Add About"}
                    </button>
                </div>

                {/* Content */}
                {about && (
                    <div className="text-sm text-gray-300 space-y-3">

                        <p><b>Name:</b> {about.name}</p>
                        <p><b>Title:</b> {about.title}</p>
                        <p><b>Email:</b> {about.personal?.[0]?.email}</p>

                        <div className="relative text-right">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-xl"
                            >
                                <BsThreeDots />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-32 bg-zinc-800 rounded-lg shadow-lg z-10">
                                    <button
                                        onClick={() => {
                                            setOpen(true)
                                            setMenuOpen(false)
                                        }}
                                        className="block w-full px-4 py-2 text-left hover:bg-zinc-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        disabled={deleteLoading}
                                        className="block w-full px-4 py-2 text-left text-red-400 hover:bg-zinc-700"
                                    >
                                        {deleteLoading && (
                                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                        )}
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                )}

            </div>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-3">

                    <div className="bg-zinc-900 w-full max-w-lg rounded-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

                        <h3 className="text-white text-lg font-semibold mb-4">
                            {about ? "Edit About" : "Add About"}
                        </h3>

                        {/* NAME */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                {...register("name")}
                                className="w-full p-3 bg-zinc-800 rounded-md text-white border border-zinc-700 focus:outline-none focus:border-white"
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">Name is required</p>
                            )}
                        </div>

                        {/* TITLE */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-300 mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="Enter your title"
                                {...register("title")}
                                className="w-full p-3 bg-zinc-800 rounded-md text-white border border-zinc-700 focus:outline-none focus:border-white"
                            />
                            {errors.title && (
                                <p className="text-red-400 text-xs mt-1">Title is required</p>
                            )}
                        </div>

                        {/* INTRODUCTION */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-300 mb-1">Introduction</label>
                            <textarea
                                placeholder="Write your introduction..."
                                {...register("introduction")}
                                rows={3}
                                className="w-full p-3 bg-zinc-800 rounded-md text-white border border-zinc-700 focus:outline-none focus:border-white"
                            />
                            {errors.introduction && (
                                <p className="text-red-400 text-xs mt-1">Introduction is required</p>
                            )}
                        </div>

                        {/* JOURNEY */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-300 mb-1">Journey</label>
                            <textarea
                                placeholder="Describe your journey..."
                                {...register("journey")}
                                rows={3}
                                className="w-full p-3 bg-zinc-800 rounded-md text-white border border-zinc-700 focus:outline-none focus:border-white"
                            />
                            {errors.journey && (
                                <p className="text-red-400 text-xs mt-1">Journey is required</p>
                            )}
                        </div>

                        {/* CURRENT WORK */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-300 mb-1">Current Work</label>
                            <textarea
                                placeholder="What are you currently working on?"
                                {...register("currentWork")}
                                rows={3}
                                className="w-full p-3 bg-zinc-800 rounded-md text-white border border-zinc-700 focus:outline-none focus:border-white"
                            />
                            {errors.currentWork && (
                                <p className="text-red-400 text-xs mt-1">Current Work is required</p>
                            )}
                        </div>
                        {/* PROFILE IMAGE */}
                        <div className="mb-5">
                            <label className="block text-sm text-gray-300 mb-1">Profile Image</label>

                            <input
                                type="file"
                                accept="image/*"
                                {...register("profileImage")}
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        setPreview(URL.createObjectURL(file))
                                    }
                                }}
                                className="w-full p-2 bg-zinc-800 rounded text-white border border-zinc-700"
                            />

                            {errors.profileImage && (
                                <p className="text-red-400 text-xs mt-1">Image is required</p>
                            )}
                        </div>
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-40 object-cover rounded-lg mb-5 border border-zinc-700"
                            />
                        )}

                        {/* PERSONAL */}
                        <h4 className="text-white mt-4 mb-2">Personal Info</h4>

                        {personalList.map((_, i) => (
                            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                {personalFields.map((key) => (
                                    <div key={key} className="flex flex-col">

                                        <input
                                            placeholder={
                                                key === "dateOfBirth"
                                                    ? "Date of Birth"
                                                    : key.charAt(0).toUpperCase() + key.slice(1)
                                            }
                                            {...register(`personal.${i}.${key}`)}
                                            className="w-full p-2 bg-zinc-800 rounded text-white border border-zinc-700 focus:outline-none focus:border-white"
                                        />

                                        {/* ERROR */}
                                        {errors.personal?.[i]?.[key] && (
                                            <span className="text-red-400 text-xs mt-1">
                                                {key} is required
                                            </span>
                                        )}

                                    </div>
                                ))}
                            </div>
                        ))}
                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-black text-white rounded w-full sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSubmit(handleSave)}
                                disabled={loading}
                                className={`px-4 py-2 rounded w-full sm:w-auto flex items-center justify-center gap-2 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-white text-black"
                                    }`}
                            >
                                {about ? "Update About" : "Save About"}

                                {loading && (
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                )}
                            </button>
                        </div>

                    </div>

                </div>
            )}
        </div>
    )
}

export default AboutAdmin