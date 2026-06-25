"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { BsThreeDots } from "react-icons/bs"

import {
    useAddSkillMutation,
    useDeleteSkillMutation,
    useGetSkillQuery,
    useUpdateSkillMutation
} from "@/redux/api/skill.api"
import { CREATE_SKILL_REQUEST, SKILL, UPDATE_SKILL_REQUEST } from "@/type/Skill"
import DynamicIcon from "@/components/DynamicIcon"

// ------------------ SCHEMA ------------------
const skillSchema = z.object({
    skillName: z.string().min(1, "Skill name is required"),
    category: z.string().optional(),
    icon: z.string().min(1, "Icon tag like <FaReact /> is required"),
    level: z.number().min(0, "Min 0").max(100, "Max 100"),
    order: z.number().optional()
})

type SkillFormValues = z.infer<typeof skillSchema>

// ------------------ COMPONENT ------------------
const SkillsAdminPage = () => {
    const { data, refetch } = useGetSkillQuery()
    const [addSkill, { isLoading: isAdding }] = useAddSkillMutation()
    const [updateSkill, { isLoading: isUpdating }] = useUpdateSkillMutation()
    const [deleteSkill, { isLoading: isDeleting }] = useDeleteSkillMutation()

    const [skills, setSkills] = useState<SKILL[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
    const [iconPreview, setIconPreview] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm<SkillFormValues>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            skillName: "",
            category: "",
            icon: "",
            level: 0,
            order: 0
        }
    })

    const iconInput = watch("icon")

    useEffect(() => {
        if (data?.result) {
            setSkills(data.result)
        }
    }, [data])

    const handleOpenModal = (skill?: SKILL) => {
        if (skill) {
            setEditMode(true)
            setSelectedSkillId(skill._id)
            reset({
                skillName: skill.skillName,
                category: skill.category,
                icon: skill.icon,
                level: skill.level,
                order: skill.order
            })
            setIconPreview(skill.icon)
        } else {
            setEditMode(false)
            setSelectedSkillId(null)
            reset({
                skillName: "",
                category: "",
                icon: "",
                level: 0,
                order: 0
            })
            setIconPreview(null)
        }
        setIsModalOpen(true)
    }

    const onSubmit = async (values: SkillFormValues) => {
        try {
            if (editMode && selectedSkillId) {
                const updatePayload: UPDATE_SKILL_REQUEST = {
                    _id: selectedSkillId,
                    skillName: values.skillName,
                    category: values.category || "",
                    icon: values.icon,
                    level: values.level,
                    order: values.order || 0
                }
                await updateSkill(updatePayload).unwrap()
            } else {
                const addPayload: CREATE_SKILL_REQUEST = {
                    skillName: values.skillName,
                    category: values.category || "",
                    icon: values.icon,
                    level: values.level,
                    order: values.order || 0
                }
                await addSkill(addPayload).unwrap()
            }
            setIsModalOpen(false)
            refetch()
        } catch (error) {
            console.error("Skill operation failed:", error)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            try {
                await deleteSkill({ _id: id }).unwrap()
                setMenuOpenId(null)
                refetch()
            } catch (error) {
                console.error("Delete failed:", error)
            }
        }
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 border rounded-2xl">
            <div className="bg-zinc-900 border  border-zinc-800 rounded-2xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-white">Skills</h2>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium border border-zinc-700 hover:bg-zinc-800 transition"
                    >
                        + Add Skill
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-zinc-800 text-gray-500 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="text-left py-4 px-6">Name</th>
                                <th className="text-left py-4 px-6">Icon</th>
                                <th className="text-left py-4 px-6">Category</th>
                                <th className="text-left py-4 px-6">Level</th>
                                <th className="text-right py-4 px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50 text-gray-300">
                            {skills.length > 0 ? (
                                [...skills].sort((a, b) => (a.order || 0) - (b.order || 0)).map((skill) => (
                                    <tr key={skill._id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="py-3 px-6 font-medium text-white">{skill.skillName}</td>
                                        <td className="py-3 px-6 text-gray-400">
                                            <DynamicIcon iconName={skill.icon} className="text-xl" />
                                        </td>
                                        <td className="py-3 px-6 text-gray-400">{skill.category || "-"}</td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-white rounded-full"
                                                        style={{ width: `${skill.level}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-500">{skill.level}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-right relative">
                                            <button
                                                onClick={() => setMenuOpenId(menuOpenId === skill._id ? null : skill._id)}
                                                className="p-2 hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-white transition"
                                            >
                                                <BsThreeDots className="text-xl" />
                                            </button>

                                            {menuOpenId === skill._id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                                                    <button
                                                        onClick={() => {
                                                            handleOpenModal(skill)
                                                            setMenuOpenId(null)
                                                        }}
                                                        className="block w-full text-left px-4 py-2 hover:bg-zinc-800 text-white transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(skill._id)}
                                                        className="block w-full text-left px-4 py-2 hover:bg-zinc-800 text-red-400 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-10 text-center text-gray-500">
                                        No skills found. Add your first skill!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-7 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    {editMode ? "Edit Skill" : "Add New Skill"}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Fill in the details for the {editMode ? "skill updates" : "new skill"}.
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
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                    Skill Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., React"
                                    {...register("skillName")}
                                    className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-all font-medium"
                                />
                                {errors.skillName && (
                                    <p className="text-red-500 text-[10px] mt-1 uppercase font-bold tracking-tight">
                                        {errors.skillName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                    Icon Tag (e.g., &lt;FaReact /&gt;)
                                </label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="text"
                                        placeholder="e.g., <FaReact />"
                                        {...register("icon")}
                                        className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                    {iconInput && (
                                        <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-2xl border border-zinc-700">
                                            <DynamicIcon iconName={iconInput} />
                                        </div>
                                    )}
                                </div>
                                {errors.icon && (
                                    <p className="text-red-500 text-[10px] mt-1 uppercase font-bold tracking-tight">
                                        {errors.icon.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                    Category (optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Frontend, Backend"
                                    {...register("category")}
                                    className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-all font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                        Level (0-100)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="80"
                                        {...register("level", { valueAsNumber: true })}
                                        className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                    {errors.level && (
                                        <p className="text-red-500 text-[10px] mt-1 uppercase font-bold tracking-tight">
                                            {errors.level.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                                        Order (sorting)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        {...register("order", { valueAsNumber: true })}
                                        className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                </div>
                            </div>

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
                                    {editMode ? "Update Skill" : "Add Skill"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SkillsAdminPage
