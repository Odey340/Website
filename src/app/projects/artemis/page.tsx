import Link from "next/link"
import { MermaidDiagram } from "@/components/MermaidDiagram"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Activity, ArrowLeft, Github, Scale, ShieldAlert, Target, TrendingUp } from "lucide-react"

export const metadata = {
    title: "Artemis | Prediction-Market Arbitrage Engine",
    description:
        "A C++ trading system that finds and trades guaranteed-payout baskets on Kalshi and Polymarket. $13,000 in realized profit trading real money.",
}

const STRATEGIES = [
    {
        name: "Cross-venue",
        where: "A Kalshi market mapped to the equivalent Polymarket market",
        condition: "YES on one venue + NO on the other < $1",
        payout: "Exactly $1",
    },
    {
        name: "NO basket",
        where: "Kalshi events flagged mutually exclusive",
        condition: "Sum of NO asks over the chosen legs < legs − 1",
        payout: "At least legs − 1",
    },
    {
        name: "YES basket",
        where: "Kalshi events declared exhaustive by hand",
        condition: "Sum of YES asks over every outcome < $1",
        payout: "Exactly $1",
    },
]

const LEG_RISK = [
    {
        step: "Re-check",
        body: "Pull fresh books for every leg and re-size. If the edge is gone, nothing is sent.",
    },
    {
        step: "Fire",
        body: "Send fill-or-kill orders, thinnest leg first, so the leg most likely to fail does so before anything else is bought.",
    },
    {
        step: "Recover",
        body: "If a leg is killed, price three exits on fresh books and take the best: complete the missing leg, shrink to a still-hedged subset, or unwind.",
    },
    {
        step: "Reconcile",
        body: "A dropped connection mid-order is resolved by client order ID and never blindly resubmitted. Anything still unknown halts trading for a person to check.",
    },
]

const RISK = [
    "Per-trade cost cap, total exposure cap, and a cap on balance utilisation",
    "Daily loss limit that counts unwind losses, locked-in losses, and stranded cost",
    "Halt after N consecutive failures or on any stranded position",
    "Book-age limit, optional N-snapshot confirmation, and a safety margin per leg",
    "Cooldown per opportunity and a maximum number of trades per hour",
    "Kill switch, and live trading requires both a config flag and a command-line flag",
]

export default function ArtemisPage() {
    return (
        <main className="container max-w-5xl py-12 md:py-20 space-y-16">
            {/* Header */}
            <div className="relative pb-12 border-b border-zinc-900 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-6">
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> All projects
                    </Link>
                    <div className="flex items-center space-x-3 text-primary">
                        <TrendingUp className="w-6 h-6" />
                        <span className="text-sm font-mono tracking-[0.2em] uppercase">Trading system // C++17</span>
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent italic">
                            Artemis
                        </h1>
                        <p className="text-2xl font-light text-zinc-400 max-w-3xl leading-relaxed">
                            A prediction-market arbitrage engine. It finds sets of contracts whose{" "}
                            <span className="text-white">guaranteed payout</span> is worth more than their{" "}
                            <span className="text-white">price after fees</span>, sizes them against real depth, and
                            executes them.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Badge variant="terminal" className="py-1.5 px-4 text-xs">$13,000 REALIZED PROFIT</Badge>
                        <Badge variant="outline" className="border-zinc-800 text-zinc-400 py-1.5 px-4 text-xs font-mono">KALSHI + POLYMARKET</Badge>
                        <Badge variant="secondary" className="bg-zinc-900 text-zinc-400 py-1.5 px-4 text-xs">94 GOOGLETEST CASES</Badge>
                    </div>
                    <div className="pt-2">
                        <a href="https://github.com/Odey340/Artemis" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-primary text-black hover:bg-primary/90 font-bold px-8 h-12 rounded-none">
                                <Github className="mr-2 w-4 h-4" /> VIEW SOURCE
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            {/* The trade */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="space-y-5">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <Target className="w-6 h-6 text-primary" /> The trade
                    </h2>
                    <p className="text-zinc-400 leading-relaxed">
                        A binary event contract pays $1 if the event happens and $0 if it does not. If two venues
                        list the same event, holding YES on one and NO on the other pays exactly $1 whatever happens.
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                        So whenever the two sides together cost less than $1 after fees, the difference is locked in
                        at entry. Artemis matches equivalent contracts across Kalshi and Polymarket and flags those
                        moments.
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                        I traded it with real money and made <span className="text-white font-semibold">$13,000</span>{" "}
                        on second-tier ice hockey and women&apos;s college basketball markets.
                    </p>
                </div>
                <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
                        Worked example (illustrative prices)
                    </div>
                    <dl className="space-y-3 font-mono text-sm tabular-nums">
                        <div className="flex justify-between text-zinc-300">
                            <dt>Buy YES on venue A</dt>
                            <dd>$0.46</dd>
                        </div>
                        <div className="flex justify-between text-zinc-300">
                            <dt>Buy NO on venue B</dt>
                            <dd>$0.50</dd>
                        </div>
                        <div className="flex justify-between text-zinc-500">
                            <dt>Fees, both legs</dt>
                            <dd>$0.02</dd>
                        </div>
                        <div className="flex justify-between border-t border-zinc-800 pt-3 text-zinc-300">
                            <dt>Total cost</dt>
                            <dd>$0.98</dd>
                        </div>
                        <div className="flex justify-between text-zinc-300">
                            <dt>Payout, either outcome</dt>
                            <dd>$1.00</dd>
                        </div>
                        <div className="flex justify-between border-t border-zinc-800 pt-3 text-primary font-bold">
                            <dt>Locked-in edge per pair</dt>
                            <dd>$0.02</dd>
                        </div>
                    </dl>
                    <p className="mt-6 text-xs text-zinc-500 leading-relaxed">
                        The profit arrives when the event settles, so capital is tied up until then. Exposure caps
                        are sized with that in mind.
                    </p>
                </div>
            </section>

            {/* Strategies */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Scale className="w-6 h-6 text-primary" /> What it looks for
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-zinc-800">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead className="bg-zinc-900/50 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                            <tr>
                                <th className="px-5 py-3 font-medium">Strategy</th>
                                <th className="px-5 py-3 font-medium">Where</th>
                                <th className="px-5 py-3 font-medium">Condition, after fees</th>
                                <th className="px-5 py-3 font-medium">Guaranteed payout</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                            {STRATEGIES.map((s) => (
                                <tr key={s.name} className="text-zinc-400">
                                    <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">{s.name}</td>
                                    <td className="px-5 py-4">{s.where}</td>
                                    <td className="px-5 py-4 font-mono text-xs text-zinc-300">{s.condition}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">{s.payout}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ul className="space-y-3 text-sm text-zinc-400 leading-relaxed list-disc pl-5 marker:text-zinc-700">
                    <li>
                        <span className="text-zinc-200">The NO basket does not need an exhaustive outcome list.</span>{" "}
                        At most one outcome can resolve YES, so NO on a set of n legs pays at least n − 1. Each leg
                        adds 1 − ask − fee to the margin, so the detector keeps exactly the legs where that is
                        positive.
                    </li>
                    <li>
                        <span className="text-zinc-200">Fees are rounded up per price level,</span> so the estimated
                        edge is conservative.
                    </li>
                    <li>
                        <span className="text-zinc-200">Sizing walks the actual order book</span> one contract at a
                        time and stops at the first contract that cannot pay for itself.
                    </li>
                    <li>
                        <span className="text-zinc-200">Cross-venue pairs must share resolution rules:</span> the
                        same source, cut-off, and edge cases. The same question is not enough.
                    </li>
                </ul>
            </section>

            {/* Architecture */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Activity className="w-6 h-6 text-primary" /> Architecture
                </h2>
                <p className="text-zinc-400 leading-relaxed max-w-3xl">
                    A feed thread pulls order books and hands them to the strategy thread through a lock-free
                    single-producer, single-consumer queue. All trading state lives on the strategy thread, so the
                    hot path takes no locks. Paper trading, backtests, and live trading run the same detector, risk
                    manager, and executor. Only the order gateway changes.
                </p>
                <div className="p-6 md:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/20">
                    <MermaidDiagram
                        chart={`
            graph LR
                A[Kalshi + Polymarket books] --> B[Lock-free SPSC queue]
                B --> C{Arb detector}
                C --> D[Depth-walk sizing + fees]
                D --> E[Risk manager]
                E --> F[Basket executor]
                F --> G[Order gateway]
                style A fill:#09090b,stroke:#27272a,color:#fff
                style B fill:#09090b,stroke:#27272a,color:#fff
                style C fill:#00ff9d,stroke:#00ff9d,color:#000
                style D fill:#09090b,stroke:#27272a,color:#fff
                style E fill:#09090b,stroke:#27272a,color:#fff
                style F fill:#09090b,stroke:#27272a,color:#fff
                style G fill:#00ff9d,stroke:#00ff9d,color:#000
            `}
                    />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { v: "15.1 µs", l: "mean tick-to-signal" },
                        { v: "90 µs", l: "p99 tick-to-signal" },
                        { v: "921K", l: "book rows / sec replay" },
                        { v: "94", l: "unit tests" },
                    ].map((m) => (
                        <div key={m.l} className="rounded-xl border border-zinc-900 bg-zinc-950/40 p-5">
                            <div className="font-mono text-2xl font-semibold text-white tabular-nums">{m.v}</div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">{m.l}</div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-zinc-500">
                    Timings are from the backtester replaying the bundled sample recording, as reported in the
                    project README.
                </p>
            </section>

            {/* Leg risk + risk controls */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Execution and leg risk</h2>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        The arbitrage is only risk-free if every leg fills. The real risk is buying one side and
                        missing the other, so most of the executor exists to handle that case.
                    </p>
                    <ol className="space-y-4">
                        {LEG_RISK.map((l, i) => (
                            <li key={l.step} className="flex gap-4">
                                <span className="font-mono text-xs text-primary pt-1">0{i + 1}</span>
                                <div>
                                    <h3 className="font-bold text-white">{l.step}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{l.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-primary" /> Risk controls
                    </h2>
                    <ul className="space-y-3 text-sm text-zinc-400 leading-relaxed">
                        {RISK.map((r) => (
                            <li key={r} className="flex gap-3">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                <span>{r}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Footer */}
            <div className="pt-12 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4">
                <p className="text-zinc-500 text-sm">Happy to walk through the fee model, the sizing, or the fills.</p>
                <Link href="/contact" className="text-white hover:text-primary transition-colors font-bold underline decoration-zinc-800 underline-offset-8">
                    Get in touch &rarr;
                </Link>
            </div>
        </main>
    )
}
