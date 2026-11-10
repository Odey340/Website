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
import { ProjectCard } from "@/components/landing/ProjectCard"
import { ScrollProgress } from "@/components/landing/ScrollProgress"
import { EDUCATION, EXPERIENCE, FEATURED } from "@/content/projects"

const MARQUEE = [
    "C++17",
    "prediction-market arbitrage",
    "lock-free ring buffers",
    "probability & statistics",
    "tick-level backtests",
    "EWMA z-scores",
    "memory-mapped I/O",
    "Monte Carlo simulation",
    "fee-aware sizing",
    "GoogleTest",
    "GeoGuessr",
]

export default function Home() {
    return (
        <main className="relative overflow-hidden bg-background">
            <ScrollProgress />
            <Hero />
            <Marquee />
            <Work />
            <Experience />
            <About />
            <Skills />
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
                        I build <span className="text-white">C++ trading systems</span> and test them
                        against real markets. My prediction-market arbitrage engine has made{" "}
                        <span className="text-white">$13,000 trading real money</span>, and my futures backtester
                        processes a tick in <span className="text-white">450 nanoseconds</span>.
                    </p>

                    <div
                        className="fade-up mt-9 flex flex-wrap items-center gap-4"
                        style={{ animationDelay: "260ms" }}
                    >
                        <Magnetic>
                            <Link
                                href="/#work"
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
        }, 1000)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-white/45">
            <span className="flex items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bid" />
                open to 2027 roles
            </span>
            <span className="flex items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5">
                <MapPin className="h-3 w-3 text-accent-blue" />
                Dallas, TX
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5 sm:flex">
                <Terminal className="h-3 w-3 text-accent-cyan" />
                {now || "--:--:--"} CT
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 py-1.5 normal-case md:flex">
                B.S. CS · UT Tyler · May 2027
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
        <Section id="about" tag="Profile" title="Find the edge, then prove it holds.">
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
                                Quant dev · trading · research
                            </span>
                            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-cyan" />
                        </div>
                    </div>
                </Reveal>

                <div className="space-y-8 lg:col-span-7">
                    <Reveal delay={1}>
                        <p className="text-lg leading-relaxed text-white/60 md:text-xl">
                            I like problems where a claim has to survive the market. Artemis began as a question:
                            do two venues ever price the same event far enough apart to lock in a profit after fees?
                            It became a C++ engine, and then a strategy I traded with my own money.
                        </p>
                    </Reveal>
                    <Reveal delay={2}>
                        <p className="leading-relaxed text-white/45">
                            The rest of my work follows the same habit: measure it, reproduce it, then trust it. My
                            backtester gives bit-identical results across GCC and Clang, and its estimators are
                            checked against Pandas. At DFW Airport I replaced manual spot-checks with a regression
                            suite for the data behind demand forecasts. I&apos;m a computer science student at UT
                            Tyler graduating in May 2027, and I play GeoGuessr competitively, which is pattern
                            recognition under a clock.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-3 gap-4 border-t border-hairline pt-8">
                        {[
                            { v: 13000, p: "$", s: "", d: 0, l: "realized arbitrage profit" },
                            { v: 450, p: "", s: " ns", d: 0, l: "per tick, backtester" },
                            { v: 0.9997, p: "", s: "", d: 4, l: "R², out-of-sample model" },
                        ].map((stat, i) => (
                            <Reveal key={stat.l} delay={i + 3}>
                                <div>
                                    <CountUp
                                        value={stat.v}
                                        prefix={stat.p}
                                        suffix={stat.s}
                                        decimals={stat.d}
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
        <Section id="work" tag="Selected work" title="Built, measured, and traded.">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {FEATURED.map((p, i) => (
                    <Reveal key={p.name} delay={i}>
                        <ProjectCard project={p} />
                    </Reveal>
                ))}
            </div>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  Experience                                                        */
/* ------------------------------------------------------------------ */

function Experience() {
    return (
        <Section id="experience" tag="Experience" title="Where I've done the work.">
            <ol className="divide-y divide-hairline border-y border-hairline">
                {EXPERIENCE.map((role, i) => (
                    <li key={role.title + role.org}>
                        <Reveal delay={i}>
                            <div className="grid grid-cols-1 gap-3 py-7 md:grid-cols-12 md:gap-8">
                                <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 md:col-span-3 md:pt-1.5">
                                    <div className="text-accent-cyan/80">{role.when}</div>
                                    <div className="mt-1">{role.where}</div>
                                </div>
                                <div className="md:col-span-9">
                                    <h3 className="text-xl font-semibold tracking-tight text-white">{role.title}</h3>
                                    <p className="mt-0.5 text-white/55">{role.org}</p>
                                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/50">
                                        {role.points.map((pt) => (
                                            <li key={pt} className="flex gap-3">
                                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan/60" />
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>
                    </li>
                ))}
            </ol>

            <Reveal>
                <div className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-hairline bg-white/[0.02] p-6 md:grid-cols-12 md:gap-8">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 md:col-span-3 md:pt-1.5">
                        <div className="text-accent-cyan/80">Education</div>
                        <div className="mt-1">{EDUCATION.when}</div>
                    </div>
                    <div className="md:col-span-9">
                        <h3 className="text-xl font-semibold tracking-tight text-white">{EDUCATION.school}</h3>
                        <p className="mt-0.5 text-white/55">{EDUCATION.degree}</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/50">
                            Coursework: {EDUCATION.coursework.join(", ")}.
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-white/50">{EDUCATION.honors}.</p>
                    </div>
                </div>
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
                    Let&apos;s talk about <span className="text-gradient">edge</span>, and how to measure it.
                </h2>
                <p className="mt-6 max-w-lg text-white/50">
                    I graduate in May 2027 and I&apos;m looking for quant developer, trading, and research roles.
                    Based in Dallas and open to relocation.
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
                <span>Odey Jeffs · Dallas, TX</span>
                <span>Built with Next.js · deployed on Vercel</span>
            </div>
        </footer>
    )
}
