"use client"

import { useEffect, useRef } from "react"

/** Thin reading-progress bar pinned just under the sticky navbar. */
export function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const bar = barRef.current
        if (!bar) return
        let raf = 0

        const update = () => {
            raf = 0
            const doc = document.documentElement
            const max = doc.scrollHeight - doc.clientHeight
            const p = max > 0 ? Math.min(1, doc.scrollTop / max) : 0
            bar.style.transform = `scaleX(${p})`
        }
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update)
        }

        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <div
            ref={barRef}
            aria-hidden
            className="fixed left-0 right-0 top-14 z-50 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-cyan via-accent-blue to-transparent"
        />
    )
}
