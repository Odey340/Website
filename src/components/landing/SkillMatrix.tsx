"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Group = "Languages" | "Systems" | "Quant" | "Data & tools"

type Skill = { name: string; group: Group; note: string }

const SKILLS: Skill[] = [
    { name: "C++17", group: "Languages", note: "trading engine, backtester, lock-free queues" },
    { name: "Python", group: "Languages", note: "Pandas, NumPy, research and validation" },
    { name: "SQL", group: "Languages", note: "PostgreSQL, query tuning" },
    { name: "R", group: "Languages", note: "statistical analysis pipelines" },
    { name: "MATLAB", group: "Languages", note: "simulation and surrogate modeling" },
    { name: "Lock-free data structures", group: "Systems", note: "CAS ring buffers, cache-line-aligned atomics" },
    { name: "Multithreading", group: "Systems", note: "feed and strategy threads, no locks on the hot path" },
    { name: "Memory-mapped I/O", group: "Systems", note: "streaming ticks straight from disk" },
    { name: "Latency benchmarking", group: "Systems", note: "per-tick timing, p99, throughput" },
    { name: "Event-driven design", group: "Systems", note: "one code path for backtest, paper and live" },
    { name: "Linux", group: "Systems", note: "GCC, Clang, CMake, Bash" },
    { name: "Probability & statistics", group: "Quant", note: "confidence intervals, error propagation" },
    { name: "Arbitrage pricing", group: "Quant", note: "fee-aware net edge, depth-walk sizing" },
    { name: "Backtesting", group: "Quant", note: "slippage, commissions, reproducible P&L" },
    { name: "Time-series analysis", group: "Quant", note: "EWMA mean and variance, z-scores" },
    { name: "Monte Carlo simulation", group: "Quant", note: "simulation-based estimates" },
    { name: "Model validation", group: "Quant", note: "k-fold cross-validation, out-of-sample tests" },
    { name: "PostgreSQL", group: "Data & tools", note: "ingestion and storage, 38 ms p99 queries" },
    { name: "GoogleTest", group: "Data & tools", note: "C++ estimators verified against Pandas" },
    { name: "Git", group: "Data & tools", note: "version control" },
    { name: "AWS", group: "Data & tools", note: "cloud deployment" },
    { name: "React", group: "Data & tools", note: "monitoring dashboards, this site" },
    { name: "MongoDB", group: "Data & tools", note: "document storage" },
]

const TABS: ("All" | Group)[] = ["All", "Languages", "Systems", "Quant", "Data & tools"]

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
