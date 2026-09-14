"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
    ArrowRight,
    ArrowUpRight,
    Github,
    Linkedin,
    MapPin,
    Mail,
    MousePointer2,
    Terminal,
} from "lucide-react"
import { Reveal } from "@/components/landing/Reveal"
import { Magnetic } from "@/components/landing/Magnetic"
import { CountUp } from "@/components/landing/CountUp"
import { OrderBook } from "@/components/landing/OrderBook"
import { SkillMatrix } from "@/components/landing/SkillMatrix"
import { ProjectCard, type Project } from "@/components/landing/ProjectCard"
import { LivePortfolio } from "@/components/landing/LivePortfolio"
import { ScrollProgress } from "@/components/landing/ScrollProgress"

const MARQUEE = [
    "low-latency C++",
    "lock-free queues",
    "mean reversion",
    "cache-aware layout",
    "RDTSC profiling",
    "event-driven backtests",
    "SIMD",
    "kernel-bypass I/O",
    "time-series research",
    "GeoGuessr",
]

const PROJECTS: Project[] = [
    {
        name: "Lumina",
        kind: "Quant fund",
        blurb:
            "Proprietary engine trading a mean-reversion signal timed to earnings-call volatility, built for risk-adjusted return rather than raw exposure.",
        stat: { label: "2025 return", value: "+38.07%" },
        stack: ["C++20", "HFT", "stats"],
        href: "/projects/lumina",
        source: "https://github.com/Odey340/Lumina",
        glow: "52 211 153",
        index: "01",
    },
    {
        name: "Artemis",
        kind: "Engine",
        blurb:
            "A benchmarking harness that isolates OS jitter and hardware noise from real application latency using RDTSC and pinned cores.",
        stat: { label: "Determinism", value: "99.999%" },
        stack: ["Rust", "RDTSC", "Postgres"],
        href: "/projects/artemis",
        source: "https://github.com/Odey340",
        glow: "59 130 246",
        index: "02",
    },
    {
        name: "Scallion",
        kind: "Hackathon winner",
        blurb:
            "Uncovers your biological age from blood-panel PDFs, webcam pulse capture, and encrypted lifestyle signals — unified into one healthspan score with a single actionable step, modeled with MATLAB/SimBiology.",
        stat: { label: "HackRice 16", value: "2x Track Winner" },
        stack: ["MATLAB", "Backboard"],
        href: "https://scallion.us/",
        external: true,
        source: "https://github.com/Odey340/Scallion",
        devpost: "https://devpost.com/software/scallion",
        badges: [
            { src: "/badges/rice.png", alt: "Rice University" },
            { src: "/badges/mathworks.png", alt: "MathWorks" },
        ],
        award: "HackRice 16 — MathWorks & Backboard Track Winner",
        glow: "245 158 11",
        index: "03",
    },
    {
        name: "Portfolio Tracker",
        kind: "Web app",
        blurb:
            "Real-time dashboard comparing a 23-asset book against SPY — route handlers, streaming charts, and a dark trading-desk UI.",
        stat: { label: "Assets tracked", value: "23" },
        stack: ["Next.js", "TS", "Recharts"],
        href: "/portfolio",
        glow: "34 211 238",
        index: "04",
    },
]

export default function Home() {
    return (
        <main className="relative overflow-hidden bg-background">
            <ScrollProgress />
            <Hero />
            <Marquee />
            <About />
            <Skills />
            <Work />
            <Numbers />
            <Contact />
            <MiniFooter />
        </main>
    )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

function Hero() {
    return (
        <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:px-14">
            <AmbientBackground />

            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
                {/* copy */}
                <div className="lg:col-span-7">
                    <div className="fade-up">
                        <StatusRow />
                    </div>

                    <h1
                        className="fade-up mt-7 text-[15vw] font-black leading-[0.85] tracking-tighter sm:text-7xl md:text-8xl lg:text-[7.5rem]"
                        style={{ animationDelay: "60ms" }}
                    >
                        <span className="block text-white">ODEY</span>
                        <span className="block italic text-gradient">JEFFS</span>
                    </h1>

                    <p
                        className="fade-up mt-7 max-w-xl text-lg font-light leading-relaxed text-white/55 sm:text-xl md:text-2xl"
                        style={{ animationDelay: "160ms" }}
                    >
                        A low-level <span className="text-white">C++ programmer</span> chasing{" "}
                        <span className="text-white">high-frequency trading</span>, with a background in
                        quantitative data analysis. Professional{" "}
                        <span className="text-white">GeoGuessr</span> player on the side.
                    </p>

                    <div
                        className="fade-up mt-9 flex flex-wrap items-center gap-4"
                        style={{ animationDelay: "260ms" }}
                    >
                        <Magnetic>
                            <Link
                                href="/portfolio"
                                className="group inline-flex h-13 items-center gap-2 rounded-full bg-accent-cyan px-7 py-3.5 text-sm font-bold text-[#06202a] transition-shadow hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                            >
                                View the work
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Magnetic>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                        >
                            Get in touch
                            <ArrowUpRight className="h-4 w-4 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </Link>
                    </div>
                </div>

                {/* visual */}
                <div
                    className="fade-up flex justify-center lg:col-span-5 lg:justify-end"
                    style={{ animationDelay: "340ms" }}
                >
                    <OrderBook />
                </div>
            </div>

            <ScrollCue />
        </section>
    )
}

function StatusRow() {
    const [now, setNow] = useState<string>("")
    const [lat, setLat] = useState(0.82)

    useEffect(() => {
        const t = setInterval(() => {
            setNow(
                new Intl.DateTimeFormat("en-US", {
                    timeZone: "America/Chicago",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                }).format(new Date()),
            )
            setLat(+(0.6 + Math.random() * 0.5).toFixed(2))
        }, 1000)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-white/45">
            <span className="flex items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bid" />
                runtime_ok
            </span>
            <span className="flex items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
                <MapPin className="h-3 w-3 text-accent-blue" />
                Austin, TX
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5 sm:flex">
                <Terminal className="h-3 w-3 text-accent-cyan" />
                {now || "--:--:--"} CT
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5 normal-case md:flex">
                p50 {lat.toFixed(2)}µs
            </span>
        </div>
    )
}

function ScrollCue() {
    return (
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/30 md:flex">
            <MousePointer2 className="h-4 w-4" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">scroll</span>
            <span className="h-8 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
        </div>
    )
}

function AmbientBackground() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(60vw 60vh at 12% -10%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(45vw 45vh at 100% 15%, rgba(34,211,238,0.10), transparent 55%)",
                }}
            />
            <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                           */
/* ------------------------------------------------------------------ */

function Marquee() {
    return (
        <div className="border-y border-hairline bg-white/[0.015] py-4">
            <div className="pause-on-hover mask-fade-x flex overflow-hidden">
                <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 font-mono text-sm text-white/40">
                    {[...MARQUEE, ...MARQUEE].map((w, i) => (
                        <span key={i} className="flex items-center gap-8">
                            {w}
                            <span className="text-accent-cyan/40">/</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Section shell                                                     */
/* ------------------------------------------------------------------ */

function Section({
    id,
    tag,
    title,
    children,
}: {
    id: string
    tag: string
    title: string
    children: React.ReactNode
}) {
    return (
        <section id={id} className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16 lg:px-14">
            <Reveal>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-accent-cyan/70">
                    <span className="h-px w-8 bg-accent-cyan/40" />
                    {tag}
                </div>
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                    {title}
                </h2>
            </Reveal>
            <div className="mt-10">{children}</div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  About                                                             */
/* ------------------------------------------------------------------ */

function About() {
    return (
        <Section id="about" tag="Profile" title="Close to the metal, curious about the map.">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-5">
                    <div className="group relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-hairline">
                        <Image
                            src="/me.jpg"
                            alt="Odey Jeffs"
                            fill
                            className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                            sizes="(max-width: 1024px) 100vw, 400px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-transparent" />
                        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-hairline bg-black/40 px-4 py-3 backdrop-blur-md">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan">
                                HFT &amp; Quant // Austin, TX
                            </span>
                            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-cyan" />
                        </div>
                    </div>
                </Reveal>

                <div className="space-y-8 lg:col-span-7">
                    <Reveal delay={1}>
                        <p className="text-lg leading-relaxed text-white/60 md:text-xl">
                            I work where the cost of an instruction actually matters — writing C++ that respects the
                            cache hierarchy, the branch predictor, and the wire. The goal is always the same: shave
                            the tail latency without giving up correctness.
                        </p>
                    </Reveal>
                    <Reveal delay={2}>
                        <p className="leading-relaxed text-white/45">
                            Before the systems work I spent my time in quantitative data analysis — building
                            event-driven backtests, researching mean-reversion signals, and learning the hard way
                            that a strategy is only as good as its assumptions about slippage. Away from the desk I
                            play GeoGuessr competitively, which is really just pattern recognition under a clock.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-3 gap-4 border-t border-hairline pt-8">
                        {[
                            { v: 4, s: "", l: "core languages" },
                            { v: 23, s: "", l: "assets modeled" },
                            { v: 2026, s: "", l: "tracking since" },
                        ].map((stat, i) => (
                            <Reveal key={stat.l} delay={i + 3}>
                                <div>
                                    <CountUp
                                        value={stat.v}
                                        suffix={stat.s}
                                        className="text-3xl font-semibold tracking-tight text-white tabular-nums md:text-4xl"
                                    />
                                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/35">
                                        {stat.l}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  Skills                                                            */
/* ------------------------------------------------------------------ */

function Skills() {
    return (
        <Section id="stack" tag="Toolkit" title="The stack, by concern.">
            <Reveal>
                <SkillMatrix />
            </Reveal>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  Work                                                              */
/* ------------------------------------------------------------------ */

function Work() {
    return (
        <Section id="work" tag="Selected work" title="Things I've shipped.">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((p, i) => (
                    <Reveal key={p.name} delay={i}>
                        <ProjectCard project={p} />
                    </Reveal>
                ))}
            </div>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  Numbers                                                           */
/* ------------------------------------------------------------------ */

function Numbers() {
    return (
        <Section id="live" tag="Live" title="Numbers that update without me.">
            <Reveal>
                <LivePortfolio />
            </Reveal>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  Contact                                                           */
/* ------------------------------------------------------------------ */

function Contact() {
    return (
        <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28 lg:px-14">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-[120px]" />
            </div>
            <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent-cyan/70">Open to work</p>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Let&apos;s build something that runs in <span className="text-gradient">microseconds</span>.
                </h2>
                <p className="mt-6 max-w-lg text-white/50">
                    Roles in HFT, low-latency infrastructure, or quant research — or just a good conversation about
                    the order book. My inbox is open.
                </p>
            </Reveal>

            <Reveal delay={2}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                    <Magnetic strength={22}>
                        <a
                            href="mailto:odeyjeffs7@gmail.com"
                            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]"
                        >
                            <Mail className="h-4 w-4" />
                            odeyjeffs7@gmail.com
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </Magnetic>
                    <a
                        href="https://github.com/Odey340"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-hairline p-4 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/odeydj/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-hairline p-4 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </a>
                </div>
            </Reveal>
        </section>
    )
}

function MiniFooter() {
    return (
        <footer className="border-t border-hairline px-5 py-10 sm:px-8 lg:px-14">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-white/30 sm:flex-row">
                <span>Odey Jeffs — Austin, TX</span>
                <span>Built with Next.js · deployed on Vercel</span>
            </div>
        </footer>
    )
}
