"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, TrendingUp } from "lucide-react"
import { CountUp } from "./CountUp"
import { Sparkline } from "./Sparkline"

type Point = { date: string; value: number; percentChange: string }
type Api = { portfolio: Point[]; spy: Point[]; startDate: string; dailyChange: number }

/** Pulls the (mock) portfolio series from the site's own route handler. */
export function LivePortfolio() {
    const [data, setData] = useState<Api | null>(null)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        let alive = true
        fetch("/api/portfolio")
            .then((r) => r.json())
            .then((d) => alive && setData(d))
            .catch(() => alive && setFailed(true))
        return () => {
            alive = false
        }
    }, [])

    const ytd = data ? parseFloat(data.portfolio.at(-1)!.percentChange) : 8.36
    const spyYtd = data ? parseFloat(data.spy.at(-1)!.percentChange) : 0
    const alpha = ytd - spyYtd
    const series = data ? sample(data.portfolio.map((p) => p.value), 60) : []
    const baseline = data ? sample(data.spy.map((p) => p.value), 60) : []
    const asOf = data
        ? new Date(data.portfolio.at(-1)!.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
        : "—"

    return (
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-hairline bg-white/[0.02] p-6 md:grid-cols-2 md:p-10">
            <div className="flex flex-col justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
                        <TrendingUp className="h-3.5 w-3.5 text-accent-cyan" />
                        Live portfolio · vs SPY
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <CountUp
                            value={ytd}
                            decimals={2}
                            suffix="%"
                            signed
                            className="text-6xl font-semibold tracking-tighter text-white tabular-nums md:text-7xl"
                        />
                        <span className="font-mono text-sm text-white/40">YTD</span>
                    </div>
                    <p className="mt-3 text-sm text-white/50">
                        A 23-asset book tracked in real time against the S&P 500. Currently{" "}
                        <span className={alpha >= 0 ? "text-bid" : "text-ask"}>
                            {alpha >= 0 ? "+" : ""}
                            {alpha.toFixed(2)}% {alpha >= 0 ? "ahead of" : "behind"} the index
                        </span>
                        .
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                    <Stat label="SPY YTD" value={`${spyYtd >= 0 ? "+" : ""}${spyYtd.toFixed(2)}%`} />
                    <Stat label="Assets" value="23" />
                    <Stat label="As of" value={failed ? "offline" : asOf} />
                </div>

                <Link
                    href="/portfolio"
                    className="group inline-flex w-max items-center gap-2 border-b border-white/20 pb-1 font-mono text-sm text-white transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                >
                    Open the tracker
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="relative min-h-[220px] rounded-2xl border border-hairline bg-[#0b0d12]/60 p-4">
                <div className="absolute right-4 top-4 z-10 flex gap-4 font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-accent-cyan">— portfolio</span>
                    <span className="text-white/35">-- spy</span>
                </div>
                {series.length > 1 ? (
                    <Sparkline data={series} baseline={baseline} className="h-full w-full" />
                ) : (
                    <div className="grid h-full place-items-center font-mono text-xs text-white/30">
                        {failed ? "feed unavailable" : "loading feed…"}
                    </div>
                )}
            </div>
        </div>
    )
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="font-mono text-lg font-semibold tabular-nums text-white">{value}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">{label}</div>
        </div>
    )
}

/** Down-sample a series to at most n points, keeping the last. */
function sample(arr: number[], n: number): number[] {
    if (arr.length <= n) return arr
    const step = (arr.length - 1) / (n - 1)
    return Array.from({ length: n }, (_, i) => arr[Math.round(i * step)])
}
