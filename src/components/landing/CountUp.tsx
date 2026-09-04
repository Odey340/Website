"use client"

import { useEffect, useRef, useState } from "react"

type CountUpProps = {
    value: number
    decimals?: number
    prefix?: string
    suffix?: string
    durationMs?: number
    className?: string
    /** Force a leading "+" for positive numbers. */
    signed?: boolean
}

/**
 * Counts 0 -> value once it scrolls into view. Uses rAF for the tween but
 * always settles on the final value (timeout fallback) so a background tab
 * can't leave it stuck at zero.
 */
export function CountUp({
    value,
    decimals = 0,
    prefix = "",
    suffix = "",
    durationMs = 1500,
    className,
    signed = false,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        let raf = 0
        let done = false
        const finish = () => {
            done = true
            setDisplay(value)
        }

        const start = () => {
            const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
            if (reduce) return finish()
            const t0 = performance.now()
            const tick = (t: number) => {
                const p = Math.min(1, (t - t0) / durationMs)
                const eased = 1 - Math.pow(1 - p, 3)
                setDisplay(value * eased)
                if (p < 1 && !done) raf = requestAnimationFrame(tick)
                else finish()
            }
            raf = requestAnimationFrame(tick)
        }

        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    start()
                    io.disconnect()
                }
            },
            { threshold: 0.4 },
        )
        io.observe(el)
        const fallback = window.setTimeout(finish, durationMs + 1200)

        return () => {
            io.disconnect()
            cancelAnimationFrame(raf)
            window.clearTimeout(fallback)
        }
    }, [value, durationMs])

    const sign = signed && display > 0 ? "+" : ""
    const formatted =
        Math.abs(value) >= 10000
            ? display.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
            : display.toFixed(decimals)

    return (
        <span ref={ref} className={className}>
            {prefix}
            {sign}
            {formatted}
            {suffix}
        </span>
    )
}
