"use client"

import React, { useEffect, useState } from "react"

import {
    useAddEducationMutation,
    useDeleteEducationMutation,
    useGetEducationQuery,
    useUpdateEducationMutation
} from "@/redux/api/education.api"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { BsThreeDots } from "react-icons/bs"

import {
    CREATE_EDUCATION_REQUEST,
    EDUCATION
} from "@/type/Education"

// ✅ ZOD
const schema = z.object({
    degree: z.string().min(1, "Degree required"),
    university: z.string().min(1, "University required"),
    location: z.string().min(1, "Location required"),
    startYear: z.string().min(1, "Start year required"),
    endYear: z.string().min(1, "End year required")
})

type FormType = z.infer<typeof schema>

const AdminEducation = () => {

    const { data, refetch } = useGetEducationQuery()

    const [deleteEducation, { isLoading: deleteLoading }] = useDeleteEducationMutation()
    const [updateEducation, { isLoading: updateLoading }] = useUpdateEducationMutation()
    const [createEducation, { isLoading: createLoading }] = useAddEducationMutation()

    const [educations, setEducations] = useState<EDUCATION[]>([])
    const [open, setOpen] = useState(false)
    const [menuId, setMenuId] = useState<string | null>(null)
    const [editId, setEditId] = useState<string | null>(null)

    const [form, setForm] = useState<CREATE_EDUCATION_REQUEST>({
        degree: "",
        university: "",
        location: "",
        startYear: 0,
        endYear: 0
    })

    const loading = updateLoading || createLoading

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormType>({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (data?.result) {
            setEducations(data.result)
        }
    }, [data])

    const resetForm = () => {
        setForm({
            degree: "",
            university: "",
            location: "",
            startYear: 0,
            endYear: 0
        })
        setEditId(null)
    }

    const handleSave = handleSubmit(async () => {

        try {

            const payload = {
                ...form,
                startYear: Number(form.startYear),
                endYear: Number(form.endYear)
            }

            if (editId) {
                await updateEducation({
                    _id: editId,
                    ...payload
                }).unwrap()
            } else {
                await createEducation(payload).unwrap()
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
            await deleteEducation({ _id: id }).unwrap()
            refetch()
            setMenuId(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="max-w-5xl mx-auto mt-20 border rounded-2xl ">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 ">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Education
                    </h2>

                    <button
                        onClick={() => {
                            resetForm()
                            setOpen(true)
                        }}
                        className="bg-black text-white border border-white px-4 py-2 rounded-md text-sm"
                    >
                        + Add Education
                    </button>
                </div>

                <table className="w-full text-sm table-fixed">
                    <thead className="border-b border-zinc-700 text-gray-400">
                        <tr>
                            <th className="text-left py-3">Degree</th>
                            <th className="text-left py-3">University</th>
                            <th className="text-left py-3">Years</th>
                            <th className="text-right py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {educations.map((e) => (
                            <tr key={e._id} className="border-b border-zinc-800">

                                <td className="py-4 text-gray-200">{e.degree}</td>

                                <td className="py-4 text-gray-400">
                                    {e.university} <br />
                                    <span className="text-xs text-gray-500">{e.location}</span>
                                </td>

                                <td className="py-4 text-gray-400">
                                    {e.startYear} - {e.endYear}
                                </td>

                                <td className="text-right relative">

                                    <button
                                        onClick={() =>
                                            setMenuId(menuId === e._id ? null : e._id)
                                        }
                                        className="text-gray-400 text-2xl"
                                    >
                                        <BsThreeDots />
                                    </button>

                                    {menuId === e._id && (
                                        <div
                                            className="fixed inset-0 flex items-center justify-center bg-black/50"
                                            onClick={() => setMenuId(null)}
                                        >
                                            <div
                                                className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-[200px]"
                                                onClick={(ev) => ev.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setEditId(e._id)

                                                        setForm({
                                                            degree: e.degree,
                                                            university: e.university,
                                                            location: e.location,
                                                            startYear: e.startYear,
                                                            endYear: e.endYear
                                                        })

                                                        setValue("degree", e.degree)
                                                        setValue("university", e.university)
                                                        setValue("location", e.location)
                                                        setValue("startYear", String(e.startYear))
                                                        setValue("endYear", String(e.endYear))

                                                        setMenuId(null)
                                                        setOpen(true)
                                                    }}
                                                    className="block w-full text-left p-2 text-white hover:bg-zinc-700 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(e._id)}
                                                    className="block w-full text-left p-2 text-red-400 hover:bg-zinc-700 rounded"
                                                >
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

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-[#1c1c1e] p-7 rounded-2xl w-[420px] border border-zinc-700 max-h-[90vh] overflow-y-auto">

                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-white text-lg sm:text-xl font-semibold">
                                {editId ? "Edit Education" : "Add Education"}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Add your academic details here.
                            </p>
                        </div>

                        {/* Degree */}
                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                            Degree
                        </label>
                        <input
                            placeholder="e.g. B.Tech Computer Science"
                            value={form.degree}
                            className="w-full mb-5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                            onChange={(e) => {
                                setForm({ ...form, degree: e.target.value })
                                setValue("degree", e.target.value)
                            }}
                        />

                        {/* University */}
                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                            University
                        </label>
                        <input
                            placeholder="e.g. Pune University"
                            value={form.university}
                            className="w-full mb-5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                            onChange={(e) => {
                                setForm({ ...form, university: e.target.value })
                                setValue("university", e.target.value)
                            }}
                        />

                        {/* Location */}
                        <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                            Location
                        </label>
                        <input
                            placeholder="e.g. Pune, India"
                            value={form.location}
                            className="w-full mb-5 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                            onChange={(e) => {
                                setForm({ ...form, location: e.target.value })
                                setValue("location", e.target.value)
                            }}
                        />

                        {/* Years */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div>
                                <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                                    Start Year
                                </label>
                                <input
                                    placeholder="e.g. 2020"
                                    value={form.startYear}
                                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                                    onChange={(e) => {
                                        setForm({ ...form, startYear: Number(e.target.value) })
                                        setValue("startYear", e.target.value)
                                    }}
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-semibold tracking-widest uppercase text-gray-500 block mb-1.5">
                                    End Year
                                </label>
                                <input
                                    placeholder="e.g. 2024"
                                    value={form.endYear}
                                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none"
                                    onChange={(e) => {
                                        setForm({ ...form, endYear: Number(e.target.value) })
                                        setValue("endYear", e.target.value)
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
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-5 py-2.5 bg-white text-black rounded-full flex items-center justify-center gap-2 border"
                            >
                                {loading && (
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {editId ? "Update Education" : "Save Education"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminEducation