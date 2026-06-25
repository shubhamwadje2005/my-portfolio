// "use client"

// import React, { useEffect, useState } from "react"

// import { CREATE_EXPERIENCE_REQUEST, EXPERIENCE } from "@/type/Experience"
// import { useAddExperienceMutation, useDeleteExperienceMutation, useGetExperienceQuery, useUpdateExperienceMutation } from "@/redux/api/experience.api"

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

//         <div className="max-w-5xl mx-auto mt-20">

//             <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">

//                     <h2 className="text-xl font-semibold text-white">
//                         Experience
//                     </h2>

//                     <button
//                         onClick={() => {
//                             resetForm()
//                             setOpen(true)
//                         }}
//                         className="bg-black text-white px-4 py-2 rounded-md text-sm"
//                     >
//                         + Add Project
//                     </button>

//                 </div>

//                 {/* Table */}
//                 <table className="w-full text-sm table-fixed">

//                     <thead className="border-b border-zinc-700 text-gray-400">

//                         <tr>

//                             <th className="text-left py-3">Role</th>
//                             <th className="text-left py-3">Company</th>
//                             <th className="text-left py-3">Description</th>
//                             <th className="text-right py-3">Actions</th>

//                         </tr>

//                     </thead>

//                     <tbody>

//                         {Experience.map((p) => (

//                             <tr key={p._id} className="border-b border-zinc-800">

//                                 <td className="py-4 text-gray-200">
//                                     {p.role}
//                                 </td>

//                                 <td className="py-4 text-gray-400">
//                                     {p.company}
//                                 </td>
//                                 <td className="py-4 text-gray-400">
//                                     {p.description}
//                                 </td>

//                                 {/* <td className="py-4 max-w-[320px]">
//                                     <div className="flex flex-wrap gap-2">

//                                         {p.responsibilities.map((t, i) => (

//                                             <span
//                                                 key={i}
//                                                 className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded"
//                                             >
//                                                 {t}
//                                             </span>

//                                         ))}

//                                     </div>
//                                 </td> */}

//                                 <td className="text-center relative">

//                                     <button
//                                         onClick={() =>
//                                             setMenuId(menuId === p._id ? null : p._id)
//                                         }
//                                         className="text-gray-400 text-3xl flex items-center justify-end w-full"
//                                     >
//                                         ...
//                                     </button>

//                                     {menuId === p._id && (

//                                         <div
//                                             className="fixed inset-0 flex items-center justify-center bg-black/50"
//                                             onClick={() => setMenuId(null)}
//                                         >

//                                             <div
//                                                 className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-[200px]"
//                                                 onClick={(e) => e.stopPropagation()}
//                                             >

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
//                                                         } as CREATE_EXPERIENCE_REQUEST)

//                                                         setMenuId(null)
//                                                         setOpen(true)

//                                                     }}
//                                                     className="block w-full text-left p-2 text-white hover:bg-zinc-700 rounded"
//                                                 >
//                                                     Edit
//                                                 </button>

//                                                 <button
//                                                     onClick={() => handleDelete(p._id)}
//                                                     className="block w-full text-left p-2 text-red-400 hover:bg-zinc-700 rounded"
//                                                 >
//                                                     Delete
//                                                 </button>

//                                             </div>

//                                         </div>

//                                     )}

//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//             {/* Modal */}

//             {/* {open && (

//                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

//                     <div className="bg-zinc-900 p-6 rounded-xl w-[420px]">

//                         <h3 className="text-white text-lg mb-4">
//                             {editId ? "Edit Project" : "Add Project"}
//                         </h3>

//                         <div className="mb-2">

//                             <label className="block text-sm text-gray-300 mb-1">
//                                 Role
//                             </label>

//                             <input
//                                 type="text"
//                                 placeholder="e.g., MERN Stack Developer"
//                                 value={form.role}
//                                 className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
//                                 onChange={(e) =>
//                                     setForm({ ...form, role: e.target.value })
//                                 }
//                             />

//                         </div>


//                         <div className="mb-2">

//                             <label className="block text-sm text-gray-300 mb-1">
//                                 Company
//                             </label>

//                             <input
//                                 type="text"
//                                 placeholder="e.g., google company "
//                                 value={form.company}
//                                 className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
//                                 onChange={(e) =>
//                                     setForm({ ...form, company: e.target.value })
//                                 }
//                             />

//                         </div>

//                         <div className="mb-2">

//                             <label className="block text-sm text-gray-300 mb-1">
//                                 Period
//                             </label>

//                             <input
//                                 placeholder="e.g., Jan 2023 - Jul 2023"
//                                 value={form.period}
//                                 className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) =>
//                                     setForm({ ...form, period: e.target.value })
//                                 }
//                             />

//                         </div>


//                         <div className="mb-2">

//                             <label className="block text-sm text-gray-300 mb-1">
//                                 Description
//                             </label>

//                             <textarea
//                                 placeholder="Write short description about your role..."
//                                 value={form.description}
//                                 rows={4}
//                                 className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 resize-none"
//                                 onChange={(e) =>
//                                     setForm({ ...form, description: e.target.value })
//                                 }
//                             />

//                         </div>


//                         <div className="mb-2">

//                             <label className="block text-sm text-gray-300 mb-1">
//                                 Responsibilities
//                             </label>

//                             <textarea
//                                 placeholder="e.g., Developed APIs, Managed database, Built UI"
//                                 value={form.responsibilities.join(",")}
//                                 rows={4}
//                                 className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 resize-none"
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         responsibilities: e.target.value.split(",")
//                                     })
//                                 }
//                             />

//                         </div>


//                         <div className="mb-2">

//                             <label className="block text-sm text-gray-300 mb-1">
//                                 Order
//                             </label>

//                             <input
//                                 type="number"
//                                 placeholder="e.g., 1"
//                                 value={form.order}
//                                 className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) =>
//                                     setForm({ ...form, order: Number(e.target.value) })
//                                 }
//                             />

//                         </div>
//                         <div className="flex justify-end gap-3">

//                             <button
//                                 onClick={() => {
//                                     setOpen(false)
//                                     resetForm()
//                                 }}
//                                 className="px-3 py-2 border border-zinc-600 rounded text-gray-300"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={handleSave}
//                                 className="px-4 py-2 bg-white text-black rounded"
//                             >
//                                 {editId ? "Update" : "Save"}
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )} */}


//             {open && (

//                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

//                     <div className="bg-zinc-900 p-6 rounded-2xl w-[500px] max-h-[90vh] overflow-y-auto">

//                         <h3 className="text-white text-xl font-semibold mb-6">
//                             {editId ? "Edit Project" : "Add Project"}
//                         </h3>

//                         {/* Role */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
//                                 Role
//                             </label>

//                             <input
//                                 type="text"
//                                 placeholder="e.g., MERN Stack Developer"
//                                 value={form.role}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                                 onChange={(e) =>
//                                     setForm({ ...form, role: e.target.value })
//                                 }
//                             />
//                         </div>

//                         {/* Company */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
//                                 Company
//                             </label>

//                             <input
//                                 type="text"
//                                 placeholder="e.g., Google"
//                                 value={form.company}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-500"
//                                 onChange={(e) =>
//                                     setForm({ ...form, company: e.target.value })
//                                 }
//                             />
//                         </div>

//                         {/* Period */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
//                                 Period
//                             </label>

//                             <input
//                                 placeholder="e.g., Jan 2023 - Jul 2023"
//                                 value={form.period}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
//                                 onChange={(e) =>
//                                     setForm({ ...form, period: e.target.value })
//                                 }
//                             />
//                         </div>

//                         {/* Description */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
//                                 Description
//                             </label>

//                             <textarea
//                                 placeholder="Write short description about your role..."
//                                 value={form.description}
//                                 rows={4}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 resize-none"
//                                 onChange={(e) =>
//                                     setForm({ ...form, description: e.target.value })
//                                 }
//                             />
//                         </div>

//                         {/* Responsibilities */}
//                         <div className="mb-4">
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
//                                 Responsibilities
//                             </label>

//                             <textarea
//                                 placeholder="e.g., Developed APIs, Managed database, Built UI"
//                                 value={form.responsibilities.join(",")}
//                                 rows={4}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 resize-none"
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
//                             <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">
//                                 Order
//                             </label>

//                             <input
//                                 type="number"
//                                 placeholder="e.g., 1"
//                                 value={form.order}
//                                 className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
//                                 onChange={(e) =>
//                                     setForm({ ...form, order: Number(e.target.value) })
//                                 }
//                             />
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex justify-end gap-3 mt-6">

//                             <button
//                                 onClick={() => {
//                                     setOpen(false)
//                                     resetForm()
//                                 }}
//                                 className="px-5 py-2 rounded-full bg-black text-white border border-zinc-700"
//                             >
//                                 Cancel Project
//                             </button>

//                             <button
//                                 onClick={handleSave}
//                                 className="px-6 py-2 rounded-full bg-white text-black"
//                             >
//                                 {editId ? "Update Project" : "Save Project"}
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

import { CREATE_EXPERIENCE_REQUEST, EXPERIENCE } from "@/type/Experience"
import {
    useAddExperienceMutation,
    useDeleteExperienceMutation,
    useGetExperienceQuery,
    useUpdateExperienceMutation
} from "@/redux/api/experience.api"

import { BsThreeDots } from "react-icons/bs"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


const ExperienceAdmin = () => {

    const { data, refetch } = useGetExperienceQuery()

    const [deleteExperience, { isLoading: deleteLoading }] = useDeleteExperienceMutation()
    const [updateExperience, { isLoading: updateLoading }] = useUpdateExperienceMutation()
    const [createExperience, { isLoading: createLoading }] = useAddExperienceMutation()

    const [Experience, setExperience] = useState<EXPERIENCE[]>([])
    const [open, setOpen] = useState(false)
    const [menuId, setMenuId] = useState<string | null>(null)
    const [editId, setEditId] = useState<string | null>(null)

    const loading = updateLoading || createLoading



    // ✅ ZOD
    const schema = z.object({
        role: z.string().min(1),
        company: z.string().min(1),
        period: z.string().min(1),
        description: z.string().min(1),
        responsibilities: z.array(z.string()),
        order: z.number()
    })

    // ✅ useForm
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch
    } = useForm<CREATE_EXPERIENCE_REQUEST>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: "",
            company: "",
            period: "",
            description: "",
            responsibilities: [],
            order: 0
        }
    })

    useEffect(() => {
        if (data?.result) {
            setExperience(data.result)
        }
    }, [data])

    const resetForm = () => {
        reset({
            role: "",
            company: "",
            period: "",
            description: "",
            responsibilities: [],
            order: 0
        })
        setEditId(null)
    }

    const handleSave = async (values: CREATE_EXPERIENCE_REQUEST) => {
        if (editId) {
            await updateExperience({
                _id: editId,
                ...values
            }).unwrap()
        } else {
            await createExperience(values).unwrap()
        }

        setOpen(false)
        resetForm()
        refetch()
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteExperience({ _id: id }).unwrap()
            refetch()
            setMenuId(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-0 border rounded-2xl">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">

                    <h2 className="text-lg sm:text-xl font-semibold text-white">
                        Experience
                    </h2>

                    <button
                        onClick={() => {
                            resetForm()
                            setOpen(true)
                        }}
                        className="bg-black text-white px-4 py-2 rounded-md text-sm w-full sm:w-auto"
                    >
                        + Add Experience
                    </button>

                </div>

                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full text-sm min-w-[600px]">

                        <thead className="border-b border-zinc-700 text-gray-400">

                            <tr>
                                <th className="text-left py-3">Role</th>
                                <th className="text-left py-3">Company</th>
                                <th className="text-left py-3">Description</th>
                                <th className="text-right py-3">Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {Experience.map((p) => (

                                <tr key={p._id} className="border-b border-zinc-800">

                                    <td className="py-4 text-gray-200 whitespace-nowrap">
                                        {p.role}
                                    </td>

                                    <td className="py-4 text-gray-400 whitespace-nowrap">
                                        {p.company}
                                    </td>

                                    <td className="py-4 text-gray-400 max-w-[200px] truncate">
                                        {p.description}
                                    </td>

                                    <td className="text-center relative">

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() =>
                                                    setMenuId(menuId === p._id ? null : p._id)
                                                }
                                                className="text-gray-400 text-3xl   "
                                            >
                                                <BsThreeDots />
                                            </button>
                                        </div>

                                        {menuId === p._id && (

                                            <div
                                                className="fixed inset-0 flex items-center justify-center bg-black/50 px-4"
                                                onClick={() => setMenuId(null)}
                                            >

                                                <div
                                                    className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full max-w-[250px]"
                                                    onClick={(e) => e.stopPropagation()}
                                                >

                                                    <button
                                                        onClick={() => {

                                                            setEditId(p._id)

                                                            reset({
                                                                role: p.role,
                                                                company: p.company,
                                                                description: p.description,
                                                                period: p.period,
                                                                responsibilities: p.responsibilities,
                                                                order: p.order,
                                                            })

                                                            setMenuId(null)
                                                            setOpen(true)

                                                        }}
                                                        className="block w-full text-left p-2 text-white hover:bg-zinc-700 rounded"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(p._id)}
                                                        disabled={deleteLoading}
                                                        className="block w-full text-left p-2 text-red-400 hover:bg-zinc-700 rounded"
                                                    >
                                                        {deleteLoading && (
                                                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                                        )}
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Modal */}
            {open && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3">

                    <div className="bg-zinc-900 p-4 sm:p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

                        <div className="mb-6">
                            <h3 className="text-white text-lg sm:text-xl font-semibold ">
                                {editId ? "Edit Experience" : "Add Experience"}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Fill in the details for the new experience.
                            </p>
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Role</label>
                            <input
                                type="text"
                                placeholder="e.g., MERN Stack Developer"
                                {...register("role")}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>

                        {/* Company */}
                        <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Company</label>
                            <input
                                placeholder="e.g., Google"
                                type="text"
                                {...register("company")}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>

                        {/* Period */}
                        <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Period</label>
                            <input
                                placeholder="Jan 2023 - Jul 2023"
                                {...register("period")}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Description</label>
                            <textarea
                                {...register("description")}
                                placeholder="e.g., Like Example Description..."
                                rows={4}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>

                        {/* Responsibilities */}
                        <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Responsibilities</label>
                            <textarea
                                value={watch("responsibilities")?.join(",") || ""}
                                placeholder="e.g., Developed APIs, Managed database, Built UI"
                                rows={4}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                                onChange={(e) =>
                                    setValue("responsibilities", e.target.value.split(","))
                                }
                            />
                        </div>

                        {/* Order */}
                        <div className="mb-4">
                            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wide">Order</label>
                            <input
                                type="number"
                                {...register("order", { valueAsNumber: true })}
                                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

                            <button
                                onClick={() => {
                                    setOpen(false)
                                    resetForm()
                                }}
                                className="px-5 py-2 rounded-full bg-black text-white border border-zinc-700 w-full sm:w-auto"
                            >
                                Cancel Experience
                            </button>

                            <button
                                onClick={handleSubmit(handleSave)}
                                disabled={loading}
                                className="px-6 py-2 rounded-full bg-white text-black w-full sm:w-auto"
                            >
                                {loading && (
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {editId ? "Update Experience" : "Save Experience"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    )
}

export default ExperienceAdmin










// "use client"

// import React, { useEffect, useState } from "react"

// import { CREATE_EXPERIENCE_REQUEST, EXPERIENCE } from "@/type/Experience"
// import { useAddExperienceMutation, useDeleteExperienceMutation, useGetExperienceQuery, useUpdateExperienceMutation } from "@/redux/api/experience.api"
// import { BsThreeDots } from "react-icons/bs"

// const ExperienceAdmin = () => {

//     const { data, refetch } = useGetExperienceQuery()

//     const [deleteExperience, { isLoading: deleteLoading }] = useDeleteExperienceMutation()
//     const [updateExperience, { isLoading: updateLoading }] = useUpdateExperienceMutation()
//     const [createExperience, { isLoading: createLoading }] = useAddExperienceMutation()

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

//     const loading = updateLoading || createLoading

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

//                         <thead className="border-b border-zinc-700 text-gray-400">

//                             <tr>
//                                 <th className="text-left py-3">Role</th>
//                                 <th className="text-left py-3">Company</th>
//                                 <th className="text-left py-3">Description</th>
//                                 <th className="text-right py-3">Actions</th>
//                             </tr>

//                         </thead>

//                         <tbody>

//                             {Experience.map((p) => (

//                                 <tr key={p._id} className="border-b border-zinc-800">

//                                     <td className="py-4 text-gray-200 whitespace-nowrap">
//                                         {p.role}
//                                     </td>

//                                     <td className="py-4 text-gray-400 whitespace-nowrap">
//                                         {p.company}
//                                     </td>

//                                     <td className="py-4 text-gray-400 max-w-[200px] truncate">
//                                         {p.description}
//                                     </td>

//                                     <td className="text-center relative">

//                                         <div className="flex justify-end">
//                                             <button
//                                                 onClick={() =>
//                                                     setMenuId(menuId === p._id ? null : p._id)
//                                                 }
//                                                 className="text-gray-400 text-3xl   "
//                                             >
//                                                 <BsThreeDots />
//                                             </button>
//                                         </div>
//                                         {menuId === p._id && (

//                                             <div
//                                                 className="fixed inset-0 flex items-center justify-center bg-black/50 px-4"
//                                                 onClick={() => setMenuId(null)}
//                                             >

//                                                 <div
//                                                     className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full max-w-[250px]"
//                                                     onClick={(e) => e.stopPropagation()}
//                                                 >

//                                                     <button
//                                                         onClick={() => {

//                                                             setEditId(p._id)

//                                                             setForm({
//                                                                 role: p.role,
//                                                                 company: p.company,
//                                                                 description: p.description,
//                                                                 period: p.period,
//                                                                 responsibilities: p.responsibilities,
//                                                                 order: p.order,
//                                                             } as CREATE_EXPERIENCE_REQUEST)

//                                                             setMenuId(null)
//                                                             setOpen(true)

//                                                         }}
//                                                         className="block w-full text-left p-2 text-white hover:bg-zinc-700 rounded"
//                                                     >
//                                                         Edit
//                                                     </button>

//                                                     <button
//                                                         onClick={() => handleDelete(p._id)}
//                                                         disabled={deleteLoading}
//                                                         className="block w-full text-left p-2 text-red-400 hover:bg-zinc-700 rounded"
//                                                     >
//                                                         {deleteLoading && (
//                                                             <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
//                                                         )}
//                                                         Delete
//                                                     </button>

//                                                 </div>

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
//                                 disabled={loading}
//                                 className="px-6 py-2 rounded-full bg-white text-black w-full sm:w-auto"
//                             >
//                                 {loading && (
//                                     <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
//                                 )}
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