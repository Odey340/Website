"use client"

import { useEffect, useRef } from "react"

type SparklineProps = {
    /** Normalised or raw series; only shape matters. */
    data: number[]
    baseline?: number[]
    className?: string
    stroke?: string
    baselineStroke?: string
}

/**
 * Canvas sparkline with a one-shot "draw-on" animation and a device-pixel-ratio
 * aware backing store. Redraws on container resize.
 */
export function Sparkline({
    data,
    baseline,
    className,
    stroke = "#22d3ee",
    baselineStroke = "rgba(148,163,184,0.35)",
}: SparklineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrap = wrapRef.current
        if (!canvas || !wrap || data.length < 2) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let frame = 0
        let start = 0
        let ro: ResizeObserver | null = null

        function draw(progress: number) {
            const dpr = window.devicePixelRatio || 1
            const w = wrap!.clientWidth
            const h = wrap!.clientHeight
            canvas!.width = w * dpr
            canvas!.height = h * dpr
            canvas!.style.width = `${w}px`
            canvas!.style.height = `${h}px`
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx!.clearRect(0, 0, w, h)

            const all = baseline ? [...data, ...baseline] : data
            const min = Math.min(...all)
            const max = Math.max(...all)
            const pad = 6
            const range = max - min || 1

            const project = (arr: number[], i: number) => ({
                x: (i / (arr.length - 1)) * (w - pad * 2) + pad,
                y: h - pad - ((arr[i] - min) / range) * (h - pad * 2),
            })

            // baseline (full, faint)
            if (baseline && baseline.length > 1) {
                ctx!.beginPath()
                baseline.forEach((_, i) => {
                    const p = project(baseline, i)
                    i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y)
                })
                ctx!.strokeStyle = baselineStroke
                ctx!.lineWidth = 1
                ctx!.setLineDash([3, 3])
                ctx!.stroke()
                ctx!.setLineDash([])
            }

            // main line (animated length)
            const count = Math.max(2, Math.floor(data.length * progress))
            ctx!.beginPath()
            for (let i = 0; i < count; i++) {
                const p = project(data, i)
                i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y)
            }
            ctx!.strokeStyle = stroke
            ctx!.lineWidth = 2
            ctx!.lineJoin = "round"
            ctx!.shadowColor = stroke
            ctx!.shadowBlur = 12
            ctx!.stroke()
            ctx!.shadowBlur = 0

            // area fill
            const last = project(data, count - 1)
            ctx!.lineTo(last.x, h)
            ctx!.lineTo(project(data, 0).x, h)
            ctx!.closePath()
            const grad = ctx!.createLinearGradient(0, 0, 0, h)
            grad.addColorStop(0, "rgba(34,211,238,0.18)")
            grad.addColorStop(1, "rgba(34,211,238,0)")
            ctx!.fillStyle = grad
            ctx!.fill()

            // head dot
            ctx!.beginPath()
            ctx!.arc(last.x, last.y, 3, 0, Math.PI * 2)
            ctx!.fillStyle = stroke
            ctx!.fill()
        }

        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

        function tick(ts: number) {
            if (!start) start = ts
            const progress = reduce ? 1 : Math.min(1, (ts - start) / 1100)
            draw(progress)
            if (progress < 1) frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
        // Safety: if rAF is throttled (background tab), still paint the final chart.
        const settle = window.setTimeout(() => draw(1), 1500)

        ro = new ResizeObserver(() => draw(1))
        ro.observe(wrap)

        return () => {
            cancelAnimationFrame(frame)
            window.clearTimeout(settle)
            ro?.disconnect()
        }
    }, [data, baseline, stroke, baselineStroke])

    return (
        <div ref={wrapRef} className={className}>
            <canvas ref={canvasRef} />
        </div>
    )
}
