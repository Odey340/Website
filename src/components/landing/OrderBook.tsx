"use client"

import { useEffect, useRef, useState } from "react"

/*
 * A synthetic Level-2 order book. Not real market data — a small random-walk
 * simulation on a ~11 Hz timer that only runs while the widget is on screen
 * and the tab is visible. Depth bars ease via CSS transition.
 */

const TICK = 0.25
const LEVELS = 7
const MAX_SIZE = 260
const FRAME_MS = 90

type Level = { px: number; size: number; flash: number }
type Book = {
    mid: number
    last: number
    dir: 1 | -1
    asks: Level[]
    bids: Level[]
    rate: number
    latency: number
}

// Deterministic seed so server and first client render match exactly.
const SEED_SIZES = [64, 122, 88, 156, 47, 190, 103]

function seedLevels(mid: number, side: 1 | -1): Level[] {
    return Array.from({ length: LEVELS }, (_, i) => ({
        px: +(mid + side * TICK * (i + 1)).toFixed(2),
        size: SEED_SIZES[i],
        flash: 0,
    }))
}

function initBook(): Book {
    const mid = 5012.5
    return {
        mid,
        last: mid,
        dir: 1,
        asks: seedLevels(mid, 1),
        bids: seedLevels(mid, -1),
        rate: 1_180_000,
        latency: 0.82,
    }
}

function advance(b: Book, reprice: boolean): Book {
    const asks = b.asks.map((l) => ({ ...l, size: jitter(l.size), flash: l.flash * 0.55 }))
    const bids = b.bids.map((l) => ({ ...l, size: jitter(l.size), flash: l.flash * 0.55 }))
    let { mid, last, dir, rate, latency } = b

    if (reprice && Math.random() > 0.55) {
        const move = (Math.random() > 0.5 ? 1 : -1) as 1 | -1
        mid = +(mid + move * TICK).toFixed(2)
        dir = move
        last = +(mid + (move === 1 ? TICK : -TICK)).toFixed(2)
        asks.forEach((l, i) => (l.px = +(mid + TICK * (i + 1)).toFixed(2)))
        bids.forEach((l, i) => (l.px = +(mid - TICK * (i + 1)).toFixed(2)))
        if (move === 1 && asks[0]) asks[0].flash = 1
        if (move === -1 && bids[0]) bids[0].flash = 1
        rate = 900_000 + Math.round(Math.random() * 520_000)
        latency = +(0.6 + Math.random() * 0.5).toFixed(2)
    }
    return { mid, last, dir, asks, bids, rate, latency }
}

function jitter(size: number) {
    return Math.max(6, Math.min(MAX_SIZE, size + (Math.random() - 0.5) * 34))
}

export function OrderBook() {
    const [book, setBook] = useState<Book>(initBook)
    const wrapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
        const el = wrapRef.current
        if (!el) return

        let timer: number | undefined
        let visible = false
        let ticks = 0

        const run = () => {
            if (timer != null) return
            timer = window.setInterval(() => {
                ticks++
                setBook((b) => advance(b, ticks % 7 === 0))
            }, FRAME_MS)
        }
        const stop = () => {
            if (timer != null) {
                clearInterval(timer)
                timer = undefined
            }
        }
        const sync = () => (visible && !document.hidden ? run() : stop())

        const io = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting
                sync()
            },
            { threshold: 0.1 },
        )
        io.observe(el)
        document.addEventListener("visibilitychange", sync)

        return () => {
            stop()
            io.disconnect()
            document.removeEventListener("visibilitychange", sync)
        }
    }, [])

    const spread = book.asks[0] && book.bids[0] ? book.asks[0].px - book.bids[0].px : TICK
    const up = book.dir === 1

    return (
        <div ref={wrapRef} className="relative w-full max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent-blue/10 blur-3xl" />

            <div className="overflow-hidden rounded-2xl border border-hairline bg-[#0b0d12] shadow-2xl">
                {/* header */}
                <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
                        </span>
                        <span className="font-mono text-xs font-semibold tracking-widest text-white">ESU6</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">L2 &middot; sim</span>
                    </div>
                    <div className={`font-mono text-sm tabular-nums ${up ? "text-bid" : "text-ask"}`}>
                        {book.last.toFixed(2)}
                        <span className="ml-1 text-[10px]">{up ? "▲" : "▼"}</span>
                    </div>
                </div>

                {/* asks */}
                <div className="px-2 pt-2">
                    {[...book.asks].reverse().map((lvl, i) => (
                        <Row key={`a${i}`} lvl={lvl} side="ask" />
                    ))}
                </div>

                {/* mid */}
                <div className="my-1 flex items-center justify-between border-y border-hairline bg-white/[0.02] px-4 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">mid</span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-white">{book.mid.toFixed(2)}</span>
                    <span className="font-mono text-[10px] tabular-nums text-white/40">spr {spread.toFixed(2)}</span>
                </div>

                {/* bids */}
                <div className="px-2 pb-2">
                    {book.bids.map((lvl, i) => (
                        <Row key={`b${i}`} lvl={lvl} side="bid" />
                    ))}
                </div>

                {/* footer telemetry */}
                <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5 font-mono text-[10px] tracking-widest text-white/35">
                    <span className="uppercase">{(book.rate / 1_000_000).toFixed(2)}M msg/s</span>
                    <span className="text-accent-cyan/70">{book.latency.toFixed(2)} µs p50</span>
                </div>
            </div>
        </div>
    )
}

function Row({ lvl, side }: { lvl: Level; side: "ask" | "bid" }) {
    const pct = Math.min(100, (lvl.size / MAX_SIZE) * 100)
    const isAsk = side === "ask"
    return (
        <div className="relative flex h-6 items-center justify-between px-2 font-mono text-xs tabular-nums">
            <div
                className={`absolute inset-y-0.5 right-0 rounded-sm transition-[width] duration-200 ease-out ${isAsk ? "bg-ask/12" : "bg-bid/12"}`}
                style={{ width: `${pct}%`, opacity: 0.35 + lvl.flash * 0.65 }}
            />
            <span className={`relative z-10 ${isAsk ? "text-ask/90" : "text-bid/90"}`}>{lvl.px.toFixed(2)}</span>
            <span className="relative z-10 text-white/55">{Math.round(lvl.size)}</span>
        </div>
    )
}
