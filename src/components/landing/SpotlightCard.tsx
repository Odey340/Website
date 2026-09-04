"use client"

import { cn } from "@/lib/utils"
import { useRef, type ReactNode } from "react"

type SpotlightCardProps = {
    children: ReactNode
    className?: string
    /** Space-separated rgb triplet, e.g. "34 211 238" */
    glow?: string
}

/**
 * Card that tracks the cursor with a soft radial highlight and a matching
 * border sheen. Falls back gracefully to a static border when JS is idle.
 */
export function SpotlightCard({ children, className, glow = "34 211 238" }: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    function onMove(e: React.MouseEvent<HTMLDivElement>) {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
        el.style.setProperty("--my", `${e.clientY - rect.top}px`)
    }

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            style={{ "--glow": glow } as React.CSSProperties}
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-hairline bg-white/[0.02]",
                "transition-colors duration-300 hover:border-white/20",
                className,
            )}
        >
            {/* cursor spotlight */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--glow) / 0.14), transparent 60%)",
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    )
}
