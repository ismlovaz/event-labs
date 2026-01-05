"use client"

import { cn } from "@/utils"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { useState } from "react"

interface StickyNavProps {
    children: React.ReactNode
    className?: string
}

export const StickyNav = ({ children, className }: StickyNavProps) => {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 0) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    })

    return (
        <nav
            className={cn(
                "fixed z-[100] h-16 inset-x-0 top-0 w-full transition-all border-b",
                isScrolled
                    ? "bg-gray-950/80 backdrop-blur-lg border-gray-800"
                    : "bg-transparent border-transparent",
                className
            )}
        >
            {children}
        </nav>
    )
}
