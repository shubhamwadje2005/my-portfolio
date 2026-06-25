"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { BsThreeDots } from "react-icons/bs"
import { toast } from "react-toastify"

import {
    useAddStatusMutation,
    useGetStatusQuery,
    useUpdateStatusMutation,
    useDeleteStatusMutation
} from "@/redux/api/status.api"
import { STATUS } from "@/type/Status"

// ------------------ SCHEMA ------------------
const statusSchema = z.object({
    yearsExperience: z.string().min(1, "Required"),
    projectsCompleted: z.string().min(1, "Required"),
    technologies: z.string().min(1, "Required"),
    happyClients: z.string().min(1, "Required"),
})

type StatusFormValues = z.infer<typeof statusSchema>

const StatusAdmin = () => {
    const { data, refetch } = useGetStatusQuery()
    const [addStatus, { isLoading: isAdding }] = useAddStatusMutation()
    const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation()
    const [deleteStatus] = useDeleteStatusMutation()

    const [stats, setStats] = useState<STATUS | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showDeleteMenu, setShowDeleteMenu] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<StatusFormValues>({
        resolver: zodResolver(statusSchema),
    })

    useEffect(() => {
        if (data?.result && data.result.length > 0) {
            setStats(data.result[0])
        }
    }, [data])

    const handleOpenModal = () => {
        if (stats) {
            reset({
                yearsExperience: stats.yearsExperience,
                projectsCompleted: stats.projectsCompleted,
                technologies: stats.technologies,
                happyClients: stats.happyClients,
            })
        } else {
            reset({
                yearsExperience: "",
                projectsCompleted: "",
                technologies: "",
                happyClients: "",
            })
        }
        setIsModalOpen(true)
    }

    const onSubmit = async (values: StatusFormValues) => {
        try {
            if (stats?._id) {
                await updateStatus({ _id: stats._id, ...values }).unwrap()
                toast.success("Statistics updated!")
            } else {
                await addStatus(values).unwrap()
                toast.success("Statistics added!")
            }
            setIsModalOpen(false)
            refetch()
        } catch (error) {
            console.error("Status operation failed:", error)
            toast.error("Operation failed")
        }
    }

    const handleDelete = async () => {
        if (!stats?._id) return
        if (window.confirm("Are you sure you want to delete ALL statistics data? This cannot be undone.")) {
            try {
                await deleteStatus({ _id: stats._id }).unwrap()
                setStats(null)
                setShowDeleteMenu(false)
                refetch()
                toast.success("Data deleted successfully")
            } catch (error) {
                toast.error("Failed to delete data")
            }
        }
    }

    const formatStat = (val: string | undefined) => {
        if (!val) return "0+"
        return val.endsWith("+") ? val : `${val}+`
    }

    const statCards = [
        { label: "Years Experience", value: stats?.yearsExperience || "0" },
        { label: "Projects Completed", value: formatStat(stats?.projectsCompleted) },
        { label: "Technologies", value: formatStat(stats?.technologies) },
        { label: "Happy Clients", value: formatStat(stats?.happyClients) },
    ]

    return (
        <div className="max-w-5xl mx-auto mt-10 border rounded-[2.5rem]">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 md:p-12">

                {/* Header */}
                <div className="flex justify-between items-center mb-8 px-1">
                    <h2 className="text-3xl font-black text-white tracking-tight">Statistics</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleOpenModal}
                            className="bg-zinc-900 border border-zinc-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-all font-semibold shadow-lg active:scale-95 text-sm"
                        >
                            {stats ? (
                                <>
                                    <FiEdit2 size={16} />
                                    <span>Edit Skills</span>
                                </>
                            ) : (
                                <span>+ Add Statistics</span>
                            )}
                        </button>
                        {stats && (
                            <button
                                onClick={handleDelete}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95"
                                title="Delete All Data"
                            >
                                <FiTrash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Grid - Conditional Rendering */}
                {stats ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {statCards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900/40 border border-zinc-800/40 rounded-3xl py-6 px-8 flex flex-col items-center justify-center text-center hover:bg-zinc-900/60 transition-all duration-300 group"
                            >
                                <div className="text-5xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-300">
                                    {card.value}
                                </div>
                                <div className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                    {card.label}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-zinc-900 rounded-3xl">
                        <p className="text-zinc-600 font-medium uppercase tracking-widest text-xs">No statistics data found</p>
                    </div>
                )}
            </div>

            {/* Modal - Dark Theme as requested */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-7 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    Edit Statistics
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Update your portfolio statistics below.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-white transition text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {[
                                { id: "yearsExperience", label: "Years Experience" },
                                { id: "projectsCompleted", label: "Projects Completed" },
                                { id: "technologies", label: "Technologies" },
                                { id: "happyClients", label: "Happy Clients" },
                            ].map((field) => (
                                <div key={field.id}>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                        {field.label}
                                    </label>
                                    <input
                                        type="text"
                                        {...register(field.id as any)}
                                        placeholder={`e.g., ${field.id === "yearsExperience" ? "1" : "10"}`}
                                        className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                    {errors[field.id as keyof StatusFormValues] && (
                                        <p className="text-red-500 text-[10px] mt-1 uppercase font-bold tracking-tight">
                                            {errors[field.id as keyof StatusFormValues]?.message}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-transparent border border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700 font-medium py-3 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isAdding || isUpdating}
                                    className="flex-1 bg-white text-black hover:bg-zinc-200 font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {(isAdding || isUpdating) && (
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StatusAdmin
