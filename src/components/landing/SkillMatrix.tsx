"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Group = "Languages" | "Low-latency" | "Quant" | "Web"

type Skill = { name: string; group: Group; note: string }

const SKILLS: Skill[] = [
    { name: "C++20", group: "Languages", note: "RAII, templates, move semantics, constexpr" },
    { name: "Rust", group: "Languages", note: "ownership, zero-cost abstractions, no_std" },
    { name: "Python", group: "Languages", note: "research tooling, data pipelines" },
    { name: "TypeScript", group: "Languages", note: "strict types, this site" },
    { name: "Lock-free queues", group: "Low-latency", note: "SPSC / MPSC ring buffers, memory ordering" },
    { name: "SIMD / vectorization", group: "Low-latency", note: "AVX2 intrinsics, data-oriented layout" },
    { name: "Cache-aware design", group: "Low-latency", note: "false-sharing avoidance, hot/cold splits" },
    { name: "Branch-free hot paths", group: "Low-latency", note: "predication, table lookups" },
    { name: "RDTSC profiling", group: "Low-latency", note: "cycle-accurate microbenchmarks" },
    { name: "Kernel-bypass I/O", group: "Low-latency", note: "busy-poll, pinned threads" },
    { name: "Mean reversion", group: "Quant", note: "z-score entries, half-life sizing" },
    { name: "Event-driven backtests", group: "Quant", note: "no look-ahead, slippage models" },
    { name: "Time-series analysis", group: "Quant", note: "stationarity, rolling stats" },
    { name: "NumPy / pandas", group: "Quant", note: "vectorized research notebooks" },
    { name: "Signal research", group: "Quant", note: "feature decay, hit-rate vs payoff" },
    { name: "Next.js", group: "Web", note: "App Router, RSC, route handlers" },
    { name: "React", group: "Web", note: "hooks, refs, render discipline" },
    { name: "Canvas / rAF", group: "Web", note: "60fps loops, DPR-aware drawing" },
    { name: "Tailwind", group: "Web", note: "design tokens, v4 theme layer" },
]

const TABS: ("All" | Group)[] = ["All", "Languages", "Low-latency", "Quant", "Web"]

export function SkillMatrix() {
    const [tab, setTab] = useState<(typeof TABS)[number]>("All")

    return (
        <div>
            <div className="mask-fade-x -mx-1 flex gap-2 overflow-x-auto px-1 pb-5 md:flex-wrap md:overflow-visible">
                {TABS.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={cn(
                            "shrink-0 rounded-full border px-4 py-1.5 font-mono text-xs tracking-wide transition-colors duration-200",
                            tab === t
                                ? "border-transparent bg-accent-cyan text-[#06202a]"
                                : "border-hairline text-white/50 hover:border-white/25 hover:text-white",
                        )}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <ul className="flex flex-wrap gap-2.5">
                {SKILLS.filter((s) => tab === "All" || s.group === tab).map((s) => (
                    <li key={s.name} className="group relative fade-up">
                        <span className="flex cursor-default items-center gap-2 rounded-xl border border-hairline bg-white/[0.02] px-3.5 py-2 text-sm text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:bg-accent-cyan/[0.06] hover:text-white">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan/50 transition-colors group-hover:bg-accent-cyan" />
                            {s.name}
                        </span>
                        <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-max max-w-[220px] -translate-x-1/2 scale-95 rounded-lg border border-hairline bg-[#0b0d12] px-3 py-2 text-center font-mono text-[11px] leading-snug text-white/60 opacity-0 shadow-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                            {s.note}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
