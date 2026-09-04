"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
    children: ReactNode
    className?: string
    /** Stagger index — adds delay * 90ms before the transition starts. */
    delay?: number
}

/**
 * Scroll-triggered reveal built on IntersectionObserver + a CSS class (see
 * .reveal / .reveal.in in globals.css). Deliberately framework-free: JS
 * animation libraries pause for background tabs, which can leave content
 * stuck invisible. A safety timeout reveals the content even if the
 * observer never fires.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [shown, setShown] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (shown) return

        const reveal = () => setShown(true)

        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    reveal()
                    io.disconnect()
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        )
        io.observe(el)

        // Fallback: never let content stay hidden.
        const t = window.setTimeout(reveal, 1400)

        return () => {
            io.disconnect()
            window.clearTimeout(t)
        }
    }, [shown])

    return (
        <div
            ref={ref}
            className={cn("reveal", shown && "in", className)}
            style={delay ? { transitionDelay: `${delay * 90}ms` } : undefined}
        >
            {children}
        </div>
    )
}
