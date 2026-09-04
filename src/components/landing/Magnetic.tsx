"use client"

import { useRef, type ReactNode } from "react"

type MagneticProps = {
    children: ReactNode
    className?: string
    /** Pixels of pull toward the cursor at the edge. */
    strength?: number
}

/**
 * Drifts a child toward the pointer while hovered, springs back on leave.
 * Plain CSS transform + transition — no animation library.
 */
export function Magnetic({ children, className, strength = 16 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)

    function onMove(e: React.MouseEvent<HTMLDivElement>) {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength * 2
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength * 2
        el.style.transform = `translate(${x}px, ${y}px)`
    }

    function reset() {
        if (ref.current) ref.current.style.transform = "translate(0, 0)"
    }

    return (
        <div
            ref={ref}
            className={className}
            style={{ transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)", willChange: "transform" }}
            onMouseMove={onMove}
            onMouseLeave={reset}
        >
            {children}
        </div>
    )
}
