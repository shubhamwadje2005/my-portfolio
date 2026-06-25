"use client"

import React from "react"
import * as Fa from "react-icons/fa"
import * as Si from "react-icons/si"
import * as Ri from "react-icons/ri"
import * as Fi from "react-icons/fi"
import * as Bi from "react-icons/bi"
import * as Di from "react-icons/di"
import * as Ai from "react-icons/ai"
import * as Bs from "react-icons/bs"
import * as Md from "react-icons/md"
import * as Tb from "react-icons/tb"
import { IconContext } from "react-icons"

const iconLibraries: Record<string, any> = {
    Fa,
    Si,
    Ri,
    Fi,
    Bi,
    Di,
    Ai,
    Bs,
    Md,
    Tb
}

interface DynamicIconProps {
    iconName: string
    className?: string
    size?: string | number
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, className, size }) => {
    // Extract name from <Name />, Name />, or just Name
    let cleanName = iconName.replace(/[<>/\s]/g, "")

    // Find the library prefix (e.g., "Fa" from "FaReact")
    const prefix = cleanName.match(/^[A-Z][a-z]/)?.[0]

    if (!prefix) return null

    const library = iconLibraries[prefix]
    if (!library) return null

    const IconComponent = library[cleanName]

    if (!IconComponent) return null

    return (
        <IconContext.Provider value={{ className, size: size?.toString() }}>
            <IconComponent />
        </IconContext.Provider>
    )
}

export default DynamicIcon
