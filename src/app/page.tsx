"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, ArrowUpRight, Download, Eye, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Reveal } from "@/components/landing/Reveal"
import { Magnetic } from "@/components/landing/Magnetic"
import { CountUp } from "@/components/landing/CountUp"
import { SkillMatrix } from "@/components/landing/SkillMatrix"
import { ProjectCard } from "@/components/landing/ProjectCard"
import { ScrollProgress } from "@/components/landing/ScrollProgress"
import { EDUCATION, EXPERIENCE, FEATURED } from "@/content/projects"
import { RESUME_FILENAME, RESUME_UPDATED, RESUME_URL } from "@/content/resume"

const CURRENTLY_INTO = [
    "prediction markets",
    "C++17",
    "lock-free data structures",
    "GeoGuessr ranked",
    "fuzzing + LLMs",
    "probability puzzles",
    "Bluetooth channel sounding",
    "backtests (that hopefully don't lie)",
    "travel",
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
            <ResumeBand />
            <Contact />
            <Footer />
        </main>
    )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

function Hero() {
    return (
        <section className="relative flex min-h-[calc(100vh-5rem)] items-center px-5 pb-20 pt-12 sm:px-8 md:pt-16 lg:px-14">
            <AmbientBackground />

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                    <div className="fade-up">
                        <StatusRow />
                    </div>

                    <p className="fade-up mt-8 font-hand text-3xl text-butter" style={{ animationDelay: "40ms" }}>
                        hey, I&apos;m Odey <span className="animate-wave">👋</span>
                    </p>

                    <h1
                        className="fade-up font-display mt-2 text-5xl font-medium leading-[1.02] text-cream sm:text-6xl md:text-7xl"
                        style={{ animationDelay: "100ms" }}
                    >
                        I mostly build <span className="italic text-gradient">trading stuff</span> and data apps,
                        and try to make them <span className="scribble">actually work</span>.
                    </h1>

                    <p
                        className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-cream/65 sm:text-xl"
                        style={{ animationDelay: "180ms" }}
                    >
                        Usually in C++ or Python. I built a little prediction-market arbitrage bot that ended up
                        making <span className="font-semibold text-cream">around $13k</span> with my own money (still
                        kind of surprised), and right now I&apos;m helping out with forecasting data at DFW. Also a CS
                        student at UT Tyler.
                    </p>

                    <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "260ms" }}>
                        <Magnetic>
                            <Link
                                href="/#work"
                                className="group inline-flex items-center gap-2 rounded-full bg-tangerine px-7 py-3.5 text-sm font-bold text-[#1f120a] shadow-[0_6px_0_#b5532a] transition-all hover:translate-y-0.5 hover:shadow-[0_3px_0_#b5532a]"
                            >
                                Poke around my stuff
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Magnetic>
                        <a
                            href={RESUME_URL}
                            download={RESUME_FILENAME}
                            className="group inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 text-sm font-semibold text-cream/85 transition-colors hover:border-cream/50 hover:bg-cream/5 hover:text-cream"
                        >
                            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                            Resume, if you want it
                        </a>
                    </div>
                </div>

                <div className="fade-up flex justify-center lg:col-span-5 lg:justify-end" style={{ animationDelay: "320ms" }}>
                    <Polaroid />
                </div>
            </div>
        </section>
    )
}

function Polaroid() {
    return (
        <div className="relative w-[280px] sm:w-[320px]">
            {/* tape */}
            <div className="absolute -top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 -rotate-3 rounded-sm bg-butter/70 shadow-sm" />

            <div className="relative rotate-[3deg] rounded-md bg-[#f6efe2] p-3 pb-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:rotate-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                        src="/me.jpg"
                        alt="Odey Jeffs"
                        fill
                        priority
                        sizes="320px"
                        className="object-cover object-[60%_center]"
                    />
                </div>
                <p className="absolute inset-x-0 bottom-3 text-center font-hand text-2xl text-[#3b2f25]">
                    me, wandering around somewhere
                </p>
            </div>

            {/* stickers */}
            <div
                className="animate-float absolute -left-10 top-10 z-30 rounded-2xl bg-sage px-4 py-3 text-[#13261a] shadow-lg sm:-left-16"
                style={{ "--r": "-6deg" } as React.CSSProperties}
            >
                <div className="font-display text-2xl font-semibold leading-none">$13k</div>
                <div className="mt-1 text-[11px] font-medium leading-tight">ish, from my
                    <br />arbitrage bot</div>
            </div>
            <div
                className="animate-float absolute -right-4 bottom-24 z-30 rounded-2xl bg-sky px-4 py-3 text-[#10233a] shadow-lg sm:-right-10"
                style={{ "--r": "5deg", animationDelay: "1.5s" } as React.CSSProperties}
            >
                <div className="font-display text-2xl font-semibold leading-none">450ns</div>
                <div className="mt-1 text-[11px] font-medium leading-tight">per tick, give
                    <br />or take</div>
            </div>
        </div>
    )
}

function StatusRow() {
    const [now, setNow] = useState<string>("")

    useEffect(() => {
        const fmt = () =>
            new Intl.DateTimeFormat("en-US", {
                timeZone: "America/Chicago",
                hour: "numeric",
                minute: "2-digit",
            }).format(new Date())
        const first = setTimeout(() => setNow(fmt()), 0)
        const t = setInterval(() => setNow(fmt()), 30_000)
        return () => {
            clearTimeout(first)
            clearInterval(t)
        }
    }, [])

    return (
        <div className="flex flex-wrap items-center gap-2 text-xs text-cream/60">
            <span className="flex items-center gap-2 rounded-full bg-sage/10 px-3 py-1.5 text-sage">
                <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />
                kinda looking for 2027 stuff
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-tangerine" />
                Dallas, TX{now && <span className="text-cream/40"> · {now} here</span>}
            </span>
        </div>
    )
}

function AmbientBackground() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)]" />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(55vw 55vh at 8% -5%, rgba(255,138,87,0.16), transparent 60%), radial-gradient(40vw 45vh at 95% 20%, rgba(242,201,107,0.10), transparent 55%)",
                }}
            />
            <div className="absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay" />
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                           */
/* ------------------------------------------------------------------ */

function Marquee() {
    return (
        <div className="-rotate-1 border-y border-hairline bg-butter py-3.5 text-[#2a1d0c]">
            <div className="pause-on-hover mask-fade-x flex overflow-hidden">
                <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6 text-base font-semibold">
                    {[...CURRENTLY_INTO, ...CURRENTLY_INTO].map((w, i) => (
                        <span key={i} className="flex items-center gap-6 whitespace-nowrap">
                            {i % CURRENTLY_INTO.length === 0 && (
                                <span className="font-hand text-2xl font-bold">stuff I&apos;m into lately →</span>
                            )}
                            {w}
                            <span className="opacity-40">✦</span>
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
    note,
    title,
    children,
}: {
    id: string
    note: string
    title: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 md:py-24 lg:px-14">
            <Reveal>
                <p className="font-hand text-2xl text-tangerine">{note}</p>
                <h2 className="font-display mt-1 max-w-3xl text-4xl font-medium leading-tight text-cream sm:text-5xl">
                    {title}
                </h2>
            </Reveal>
            <div className="mt-12">{children}</div>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Work                                                              */
/* ------------------------------------------------------------------ */

function Work() {
    return (
        <Section
            id="work"
            note="some things I've made"
            title={
                <>
                    A few projects, and one I <span className="italic text-gradient">actually traded</span> with.
                </>
            }
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {FEATURED.map((p, i) => (
                    <Reveal key={p.name} delay={i}>
                        <ProjectCard project={p} />
                    </Reveal>
                ))}
            </div>
            <Reveal>
                <Link
                    href="/portfolio"
                    className="group mt-8 inline-flex items-center gap-2 text-cream/70 transition-colors hover:text-cream"
                >
                    A couple more side projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Reveal>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  Experience                                                        */
/* ------------------------------------------------------------------ */

const DOT_COLORS = ["bg-tangerine", "bg-butter", "bg-sage", "bg-sky", "bg-rose"]

function Experience() {
    return (
        <Section id="experience" note="where I've been hanging out" title="Jobs, research, and some stuff in between.">
            <ol className="relative ml-2 border-l border-dashed border-cream/15">
                {EXPERIENCE.map((role, i) => (
                    <li key={role.title + role.org} className="relative pb-10 pl-8 last:pb-0 md:pl-12">
                        <span
                            className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full ring-4 ring-background ${DOT_COLORS[i % DOT_COLORS.length]}`}
                        />
                        <Reveal delay={i}>
                            <div className="rounded-3xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-cream/20 md:p-7">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                    <h3 className="text-xl font-semibold text-cream">{role.title}</h3>
                                    <span className="text-sm text-cream/45">{role.when}</span>
                                </div>
                                <p className="mt-0.5 text-cream/60">
                                    {role.org} <span className="text-cream/30">· {role.where}</span>
                                </p>
                                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-cream/60">
                                    {role.points.map((pt) => (
                                        <li key={pt} className="flex gap-3">
                                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-cream/25" />
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </li>
                ))}
            </ol>

            <Reveal>
                <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-surface-2 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                    <div>
                        <p className="font-hand text-xl text-butter">school (still going)</p>
                        <h3 className="font-display text-2xl font-medium text-cream">{EDUCATION.school}</h3>
                        <p className="text-cream/60">
                            {EDUCATION.degree} · probably done around {EDUCATION.grad}
                        </p>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-cream/55">
                        🏆 {EDUCATION.honors}.
                    </p>
                </div>
            </Reveal>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  About                                                             */
/* ------------------------------------------------------------------ */

const OFF_THE_CLOCK = [
    { emoji: "🌍", title: "Competitive GeoGuessr", body: "Basically pattern recognition on a timer. I'm okay at it." },
    { emoji: "📚", title: "Minor in English", body: "I like writing things, not just code." },
    { emoji: "🃏", title: "Games as math problems", body: "I built a Clash Royale move simulator once. For science, mostly." },
    { emoji: "✈️", title: "Traveling", body: "Whenever I get the chance." },
]

function About() {
    return (
        <Section id="about" note="a bit more about me" title="I like problems where you sort of find out if you were right.">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="space-y-6 lg:col-span-7">
                    <Reveal>
                        <p className="text-lg leading-relaxed text-cream/70 md:text-xl">
                            Artemis kind of started as a random question: do Kalshi and Polymarket ever price the
                            same thing far enough apart to make money after fees? Sometimes, it turns out. It slowly
                            turned into a C++ project, and then something I tried with my own money.
                        </p>
                    </Reveal>
                    <Reveal delay={1}>
                        <p className="leading-relaxed text-cream/55">
                            I try to test things before I trust them, which is maybe the closest thing I have to a
                            philosophy. At DFW that meant swapping some manual spot-checks for actual tests. On the
                            side I&apos;ve been helping with research on fuzzing and wireless signals, and losing a
                            bit too much sleep to GeoGuessr.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        {[
                            { v: 13000, p: "$", s: "", d: 0, l: "ish, arbitrage profit", c: "text-sage" },
                            { v: 450, p: "", s: "ns", d: 0, l: "per tick, roughly", c: "text-sky" },
                            { v: 3, p: "", s: "", d: 0, l: "hackathon prizes (lucky)", c: "text-butter" },
                        ].map((stat, i) => (
                            <Reveal key={stat.l} delay={i + 2}>
                                <div className="rounded-2xl border border-hairline p-4">
                                    <CountUp
                                        value={stat.v}
                                        prefix={stat.p}
                                        suffix={stat.s}
                                        decimals={stat.d}
                                        className={`font-display text-3xl font-semibold tabular-nums md:text-4xl ${stat.c}`}
                                    />
                                    <div className="mt-1 text-xs text-cream/45">{stat.l}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <Reveal delay={1}>
                        <p className="mb-4 font-hand text-2xl text-butter">when I&apos;m not coding</p>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            {OFF_THE_CLOCK.map((f, i) => (
                                <li
                                    key={f.title}
                                    className="flex gap-4 rounded-2xl bg-surface p-4 transition-transform hover:-rotate-1"
                                    style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
                                >
                                    <span className="text-2xl">{f.emoji}</span>
                                    <div>
                                        <p className="font-semibold text-cream">{f.title}</p>
                                        <p className="text-sm text-cream/55">{f.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
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
        <Section id="stack" note="my toolbox, sort of" title="Stuff I tend to reach for.">
            <Reveal>
                <SkillMatrix />
            </Reveal>
        </Section>
    )
}

/* ------------------------------------------------------------------ */
/*  Resume                                                            */
/* ------------------------------------------------------------------ */

function ResumeBand() {
    return (
        <section id="resume" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-12 sm:px-8 lg:px-14">
            <Reveal>
                <div className="relative overflow-hidden rounded-[2rem] bg-tangerine p-8 text-[#1f120a] md:p-12">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-butter/50 blur-3xl" />
                    <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <p className="font-hand text-2xl">the boring-but-useful part</p>
                            <h2 className="font-display mt-1 text-4xl font-medium leading-tight sm:text-5xl">
                                If you want the short version, here&apos;s my resume.
                            </h2>
                            <p className="mt-4 max-w-md text-[#1f120a]/75">
                                Pretty much everything above, squished onto one page. Last touched in{" "}
                                {RESUME_UPDATED}, give or take.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href={RESUME_URL}
                                    download={RESUME_FILENAME}
                                    className="group inline-flex items-center gap-2 rounded-full bg-[#1f120a] px-7 py-3.5 text-sm font-bold text-cream transition-transform hover:-rotate-1 hover:scale-[1.03]"
                                >
                                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                                    Download PDF
                                </a>
                                <Link
                                    href="/resume"
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#1f120a]/80 px-7 py-3 text-sm font-bold transition-colors hover:bg-[#1f120a]/10"
                                >
                                    <Eye className="h-4 w-4" />
                                    Peek at it first
                                </Link>
                            </div>
                        </div>

                        {/* faux paper preview */}
                        <div className="hidden justify-center md:col-span-5 md:flex">
                            <Link
                                href="/resume"
                                aria-label="Preview resume"
                                className="block w-56 rotate-[4deg] rounded-md bg-[#fbf7f0] p-5 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-105"
                            >
                                <div className="mx-auto h-2.5 w-24 rounded-full bg-[#1f120a]/80" />
                                <div className="mx-auto mt-2 h-1.5 w-36 rounded-full bg-[#1f120a]/25" />
                                {["w-16", "w-20", "w-14", "w-12"].map((w, i) => (
                                    <div key={i} className="mt-4">
                                        <div className={`h-1.5 ${w} rounded-full bg-tangerine`} />
                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 w-full rounded-full bg-[#1f120a]/15" />
                                            <div className="h-1 w-11/12 rounded-full bg-[#1f120a]/15" />
                                            <div className="h-1 w-4/5 rounded-full bg-[#1f120a]/15" />
                                        </div>
                                    </div>
                                ))}
                            </Link>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}

/* ------------------------------------------------------------------ */
/*  Contact                                                           */
/* ------------------------------------------------------------------ */

function Contact() {
    return (
        <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20 text-center sm:px-8 md:py-28 lg:px-14">
            <Reveal>
                <p className="font-hand text-3xl text-tangerine">say hi!</p>
                <h2 className="font-display mx-auto mt-2 max-w-3xl text-5xl font-medium leading-[1.05] text-cream sm:text-6xl md:text-7xl">
                    Feel free to <span className="italic text-gradient">reach out</span>.
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-cream/60">
                    I&apos;m kind of keeping an eye out for software, trading, or research roles around 2027. I&apos;m
                    in Dallas but could probably move. Or just say hi, I&apos;m always down to talk about markets.
                </p>
            </Reveal>

            <Reveal delay={2}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <Magnetic strength={22}>
                        <a
                            href="mailto:odeyjeffs7@gmail.com"
                            className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-sm font-bold text-[#1f120a] shadow-[0_6px_0_#a89b86] transition-all hover:translate-y-0.5 hover:shadow-[0_3px_0_#a89b86]"
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
                        className="grid h-13 w-13 place-items-center rounded-full border border-hairline p-4 text-cream/60 transition-all hover:-rotate-6 hover:border-cream/40 hover:text-cream"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/odeydj/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-13 w-13 place-items-center rounded-full border border-hairline p-4 text-cream/60 transition-all hover:rotate-6 hover:border-cream/40 hover:text-cream"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </a>
                </div>
            </Reveal>
        </section>
    )
}

function Footer() {
    return (
        <footer className="border-t border-hairline px-5 py-8 sm:px-8 lg:px-14">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-cream/40 sm:flex-row">
                <span>© {new Date().getFullYear()} Odey Jeffs · made in Dallas, mostly late at night</span>
                <a
                    href="https://github.com/Odey340/Website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-cream"
                >
                    view the source <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
            </div>
        </footer>
    )
}
