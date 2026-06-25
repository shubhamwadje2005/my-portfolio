
// "use client"

// import React, { useState } from "react"

// const AdminProject = () => {

//     const [open, setOpen] = useState(false)

//     return (

//         <div className="max-w-5xl mx-auto mt-20">

//             <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-semibold text-white">
//                         Projects
//                     </h2>

//                     <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium">
//                         + Add Project
//                     </button>
//                 </div>

//                 {/* Table */}
//                 <table className="w-full text-sm">

//                     <thead className="border-b border-zinc-700 text-gray-400">
//                         <tr>
//                             <th className="text-left py-3">Title</th>
//                             <th className="text-left py-3">Category</th>
//                             <th className="text-left py-3">Technologies</th>
//                             <th className="text-right py-3">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>

//                         <tr className="border-b border-zinc-800">
//                             <td className="py-4 text-gray-200">Fluxify</td>

//                             <td className="py-4 text-gray-400">
//                                 web
//                             </td>

//                             <td className="py-4 flex gap-2">

//                                 <span className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded">
//                                     React
//                                 </span>

//                                 <span className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded">
//                                     Express
//                                 </span>

//                             </td>

//                             <td className="text-right text-gray-400">
//                                 ...
//                             </td>

//                         </tr>

//                     </tbody>

//                 </table>

//             </div>

//         </div>


//     )
// }

// export default AdminProject



"use client"

import React, { useEffect, useState } from "react"

import {
    useAddProjectMutation,
    useDeleteProjectMutation,
    useGetProjectQuery,
    useUpdateProjectMutation
} from "@/redux/api/project.api"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CREATE_PROJECT_REQUEST, PROJECT } from "@/type/Project"
import { BsThreeDots } from "react-icons/bs"


// ✅ ZOD
const schema = z.object({
    title: z.string().min(1, "Title required"),
    description: z.string().min(1, "Description required"),
    category: z.string().min(1, "Category required"),
    technologies: z.string().min(1, "Technologies required"),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional()
})

type FormType = z.infer<typeof schema>

const AdminProject = () => {

    const { data, refetch } = useGetProjectQuery()

    const [deleteProject, { isLoading: deleteLoading }] = useDeleteProjectMutation()
    const [updateProject, { isLoading: updateLoading }] = useUpdateProjectMutation()
    const [createProject, { isLoading: createLoading }] = useAddProjectMutation()

    const [projects, setProjects] = useState<PROJECT[]>([])
    const [open, setOpen] = useState(false)
    const [menuId, setMenuId] = useState<string | null>(null)
    const [editId, setEditId] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const [form, setForm] = useState<CREATE_PROJECT_REQUEST>({
        title: "",
        description: "",
        category: "",
        technologies: [],
        liveUrl: "",
        githubUrl: ""
    })

    const [image, setImage] = useState<File | undefined>()

    const loading = updateLoading || createLoading



    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormType>({
        resolver: zodResolver(schema)
    })
    useEffect(() => {
        if (data?.result) {
            setProjects(data.result)
        }
    }, [data])

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            category: "",
            technologies: [],
            liveUrl: "",
            githubUrl: ""
        })
        setPreview(null)
        setImage(undefined)
        setEditId(null)
    }
    const handleSave = handleSubmit(async () => {

        try {

            const payload = {
                ...form,
                technologies: Array.isArray(form.technologies)
                    ? form.technologies
                    : String(form.technologies).split(",")
            }

            if (editId) {
                await updateProject({
                    _id: editId,
                    ...payload,
                    images: image
                }).unwrap()
            } else {
                await createProject({
                    ...payload,
                    images: image
                }).unwrap()
            }

            setOpen(false)
            resetForm()
            refetch()

        } catch (error) {
            console.log(error)
        }

    })
    const handleDelete = async (id: string) => {

        try {

            await deleteProject({ _id: id }).unwrap()
            refetch()
            setMenuId(null)

        } catch (error) {
            console.log(error)
        }

    }

    return (

        <div className="max-w-5xl mx-auto mt-20 border rounded-2xl">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-semibold text-white">
                        Projects
                    </h2>

                    <button
                        onClick={() => {
                            resetForm()
                            setOpen(true)
                        }}
                        className="bg-black text-white border border-white px-4 py-2 rounded-md text-sm"
                    >
                        + Add Project
                    </button>

                </div>

                <table className="w-full text-sm table-fixed">

                    <thead className="border-b border-zinc-700 text-gray-400">

                        <tr>
                            <th className="text-left py-3">Title</th>
                            <th className="text-left py-3">Category</th>
                            <th className="text-left py-3">Technologies</th>
                            <th className="text-right py-3">Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {projects.map((p) => (

                            <tr key={p._id} className="border-b border-zinc-800">

                                <td className="py-4 text-gray-200">
                                    {p.title}
                                </td>

                                <td className="py-4 text-gray-400">
                                    {p.category}
                                </td>

                                <td className="py-4 max-w-[320px]">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {(() => {
                                            // 1. Data kasa hi aso (string ki array), tyala ekak proper flat array madhe convert kara
                                            const rawData = Array.isArray(p.technologies) ? p.technologies : [p.technologies];

                                            const techList = rawData
                                                .flatMap(item => (typeof item === 'string' ? item.split(',') : item))
                                                .map(t => String(t).trim())
                                                .filter(t => t !== "" && t !== "undefined");

                                            return (
                                                <>
                                                    {/* 2. Display First 2 Badges */}
                                                    {techList.slice(0, 2).map((t, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 rounded border border-zinc-700 shadow-sm"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}

                                                    {/* 3. Show +Count if more than 2 */}
                                                    {techList.length > 2 && (
                                                        <span className="text-gray-500 text-xs font-medium ml-1">
                                                            +{techList.length - 2}
                                                        </span>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
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
                                            className="fixed inset-0 flex items-center justify-center bg-black/50"
                                            onClick={() => setMenuId(null)}
                                        >

                                            <div
                                                className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-[200px]"
                                                onClick={(e) => e.stopPropagation()}
                                            >

                                                <button
                                                    onClick={() => {

                                                        setEditId(p._id)

                                                        setForm({
                                                            title: p.title,
                                                            description: p.description,
                                                            category: p.category,
                                                            technologies: p.technologies,
                                                            liveUrl: p.liveUrl,
                                                            githubUrl: p.githubUrl
                                                        })

                                                        setValue("title", p.title)
                                                        setValue("category", p.category)
                                                        setValue("description", p.description)
                                                        setValue("technologies", p.technologies.join(","))
                                                        setValue("liveUrl", p.liveUrl)
                                                        setValue("githubUrl", p.githubUrl)

                                                        setPreview(p.imageUrl)
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
                                                    className="block w-full text-left p-2 text-red-400 hover:bg-zinc-700 rounded flex items-center gap-2"
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


            {/* Modal */}

            {/* {open && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-zinc-900 p-6 rounded-xl w-[420px]">

                        <h3 className="text-white text-lg mb-4">
                            {editId ? "Edit Project" : "Add Project"}
                        </h3>


                        <label className="text-gray-300 text-sm">Title</label>
                        <input
                            placeholder="Enter title"
                            value={form.title}
                            className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />

                        <label className="text-gray-300 text-sm">Category</label>
                        <input
                            placeholder="Enter category"
                            value={form.category}
                            className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />

                        <label className="text-gray-300 text-sm">Project Image</label>
                        <input
                            type="file"
                            className="w-full mb-4 text-white"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                setImage(file)

                                if (file) {
                                    setPreview(URL.createObjectURL(file))
                                }
                            }}
                        />
                        {preview && (

                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-40 object-cover rounded mb-3 border border-zinc-700"
                            />

                        )}

                        <label className="text-gray-300 text-sm">Description</label>
                        <textarea
                            placeholder="e.g., Like Exampl Description.... "
                            value={form.description}
                            rows={4}
                            className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

                        <label className="text-gray-300 text-sm">Technologies</label>
                        <input
                            placeholder="e.g,. Like Example PHP , Nodejs , Sql"
                            value={form.technologies.join(",")}
                            className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    technologies: e.target.value.split(",")
                                })
                            }
                        />

                        <label className="text-gray-300 text-sm">Live URL</label>
                        <input
                            placeholder="#"
                            value={form.liveUrl}
                            className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
                            onChange={(e) =>
                                setForm({ ...form, liveUrl: e.target.value })
                            }
                        />

                        <label className="text-gray-300 text-sm">Github URL</label>
                        <input
                            placeholder="#"
                            value={form.githubUrl}
                            className="w-full mb-3 p-2 rounded bg-zinc-800 text-white"
                            onChange={(e) =>
                                setForm({ ...form, githubUrl: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => {
                                    setOpen(false)
                                    resetForm()
                                }}
                                className="px-3 py-2 border border-zinc-600 rounded text-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-white text-black rounded"
                            >
                                {editId ? "Update" : "Save"}
                            </button>

                        </div>

                    </div>

                </div>

            )} */}
            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-[#1c1c1e] p-7 rounded-2xl w-[420px] border border-zinc-700 max-h-[90vh] overflow-y-auto">


                        <div className="mb-6">
                            <h3 className="text-white text-lg sm:text-xl font-semibold ">
                                {editId ? "Edit Project" : "Add Project"}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Fill in the details for the new experience.
                            </p>
                        </div>


                        {/* Title */}
                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                            Title
                        </label>
                        <input
                            placeholder="title"
                            {...register("title")}
                            value={form.title}
                            className="w-full mb-5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                            onChange={(e) => {
                                setForm({ ...form, title: e.target.value })
                                setValue("title", e.target.value)
                            }}
                        />
                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                            Category
                        </label>
                        <input
                            placeholder="category"
                            {...register("category")}
                            value={form.category}
                            className="w-full mb-5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                            onChange={(e) => {
                                setForm({ ...form, category: e.target.value })
                                setValue("category", e.target.value)
                            }}
                        />

                        {/* Project Image */}
                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-2">
                            Project Image
                        </label>
                        <div className="flex items-center gap-3 mb-5">
                            <label className="bg-zinc-600 hover:bg-zinc-500 text-white text-sm font-semibold px-5 py-2 rounded-full cursor-pointer transition-colors">
                                Choose File
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        setImage(file)
                                        if (file) setPreview(URL.createObjectURL(file))
                                    }}
                                />
                            </label>
                            <span className="text-gray-500 text-sm">
                                {image ? image.name : "No file chosen"}
                            </span>
                        </div>
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="w-full h-40 object-cover rounded-lg mb-5 border border-zinc-700"
                            />
                        )}

                        {/* Technologies */}
                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                            Technologies (Comma Separated)
                        </label>
                        <input
                            placeholder="e.g,. Like Example PHP , Nodejs , Sql"
                            {...register("technologies")}
                            value={form.technologies}
                            className="w-full mb-5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    technologies: e.target.value.split(",")
                                })
                                setValue("technologies", e.target.value)
                            }}
                        />

                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                            Description
                        </label>
                        <textarea
                            placeholder="e.g., Like Exampl Description.... "
                            value={form.description}
                            {...register("description")}
                            rows={4}
                            className="w-full mb-5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                            onChange={(e) => {
                                setForm({ ...form, description: e.target.value })
                                setValue("description", e.target.value)
                            }}
                        />

                        {/* Live URL + Github URL side by side */}
                        <div className="grid grid-cols-2 gap-3 mb-7">
                            <div>
                                <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                                    Live URL
                                </label>
                                <input
                                    placeholder="#"
                                    {...register("liveUrl")}
                                    value={form.liveUrl}
                                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                                    onChange={(e) => {
                                        setForm({ ...form, liveUrl: e.target.value })
                                        setValue("liveUrl", e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                                    Github URL
                                </label>
                                <input
                                    placeholder="#"
                                    {...register("githubUrl")}
                                    value={form.githubUrl}
                                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                                    onChange={(e) => {
                                        setForm({ ...form, githubUrl: e.target.value })
                                        setValue("githubUrl", e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end items-center gap-4">
                            <button
                                onClick={() => { setOpen(false); resetForm() }}
                                className="text-white text-sm px-6 py-3 rounded-full border border-zinc-600 bg-black hover:bg-zinc-900 transition-colors"
                            >
                                Cancel Project
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-5 py-2.5 bg-white text-black rounded flex items-center justify-center gap-2 rounded-full border"
                            >

                                {loading && (
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                )}

                                {editId ? "Update Project" : "Save Project"}

                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>

    )
}

export default AdminProject