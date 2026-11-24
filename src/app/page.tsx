"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, ArrowUpRight, BookOpen, Download, Eye, Gamepad2, Github, Globe2, Linkedin, Mail, MapPin, Plane } from "lucide-react"
import { Reveal } from "@/components/landing/Reveal"
import { Magnetic } from "@/components/landing/Magnetic"
import { CountUp } from "@/components/landing/CountUp"
import { SkillMatrix } from "@/components/landing/SkillMatrix"
import { ProjectCard } from "@/components/landing/ProjectCard"
import { ScrollProgress } from "@/components/landing/ScrollProgress"
import { EquityCurve, PlacesStrip } from "@/components/landing/EquityCurve"
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
        <section className="relative px-5 pb-10 pt-10 sm:px-8 md:pt-16 lg:px-14">
            <AmbientBackground />

            <div className="mx-auto w-full max-w-6xl">
                <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-8">
                        <div className="fade-up">
                            <StatusRow />
                        </div>

                        <p className="fade-up mt-10 text-base font-medium text-moss" style={{ animationDelay: "40ms" }}>
                            hey, I&apos;m Odey
                        </p>

                        <h1
                            className="fade-up font-display mt-3 text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.045em] text-chalk sm:text-7xl lg:text-[5.6rem]"
                            style={{ animationDelay: "100ms" }}
                        >
                            I mostly build <span className="text-leaf">trading stuff</span> and data apps, and try to
                            make them actually work.
                        </h1>
                    </div>

                    <div className="fade-up hidden justify-end lg:col-span-4 lg:flex" style={{ animationDelay: "220ms" }}>
                        <Portrait />
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
                    <p
                        className="fade-up max-w-xl text-lg leading-relaxed text-chalk/65 lg:col-span-7"
                        style={{ animationDelay: "180ms" }}
                    >
                        Usually in C++ or Python. I built a little prediction-market arbitrage bot that ended up
                        making <span className="font-semibold text-chalk">around $13k</span> with my own money. Right now I&apos;m helping out with forecasting data at DFW and building{" "}
                        <a href="https://mechus.casa/" target="_blank" rel="noopener noreferrer" className="font-semibold text-chalk underline decoration-leaf/50 underline-offset-4 hover:text-leaf">
                            Tally
                        </a>
                        , a little startup for property inspections, with my team. Also a CS student at UT Tyler.
                    </p>

                    <div className="fade-up flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end" style={{ animationDelay: "260ms" }}>
                        <Magnetic>
                            <Link
                                href="/#work"
                                className="inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-3.5 text-sm font-bold text-background transition-colors hover:bg-mint"
                            >
                                Poke around my stuff
                            </Link>
                        </Magnetic>
                        <a
                            href={RESUME_URL}
                            download={RESUME_FILENAME}
                            className="group inline-flex items-center gap-2 rounded-full border border-chalk/20 px-7 py-3.5 text-sm font-semibold text-chalk/85 transition-colors hover:border-chalk/50 hover:bg-chalk/5 hover:text-chalk"
                        >
                            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                            Resume, if you want it
                        </a>
                    </div>
                </div>

                {/* the one big moment: a P&L line that draws itself once */}
                <div className="mt-6 lg:mt-2">
                    <EquityCurve />
                </div>

                <div className="fade-up" style={{ animationDelay: "1600ms" }}>
                    <PlacesStrip />
                </div>
            </div>
        </section>
    )
}

function Portrait() {
    return (
        <figure className="w-[260px] xl:w-[280px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-hairline">
                <Image
                    src="/me.jpg"
                    alt="Odey Jeffs"
                    fill
                    priority
                    sizes="280px"
                    className="object-cover object-[60%_center]"
                />
            </div>
            <figcaption className="mt-3 text-sm text-chalk/45">me, wandering around somewhere</figcaption>
        </figure>
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
        <div className="flex flex-wrap items-center gap-2 text-xs text-chalk/60">
            <span className="flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1.5 text-mint">
                <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
                looking for 2027 opportunities
            </span>
            <a
                href="https://mechus.casa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 transition-colors hover:border-leaf/40 hover:text-chalk"
            >
                founder @ tally
                <ArrowUpRight className="h-3 w-3" />
            </a>
            <span className="flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-leaf" />
                {now ? (
                    <span>
                        Dallas, TX<span className="text-chalk/40">, {now} here</span>
                    </span>
                ) : (
                    "Dallas, TX"
                )}
            </span>
        </div>
    )
}

function AmbientBackground() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(60vw 50vh at 0% 0%, rgba(79,209,130,0.09), transparent 60%)",
                }}
            />
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                           */
/* ------------------------------------------------------------------ */

function Marquee() {
    return (
        <div className="border-b border-hairline py-5 text-chalk/55">
            <div className="pause-on-hover mask-fade-x flex overflow-hidden">
                <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6 text-sm font-medium">
                    {[...CURRENTLY_INTO, ...CURRENTLY_INTO].map((w, i) => (
                        <span key={i} className="flex items-center gap-6 whitespace-nowrap">
                            {i % CURRENTLY_INTO.length === 0 && (
                                <span className="text-leaf">stuff I&apos;m into lately</span>
                            )}
                            {w}
                            <span className="h-1 w-1 rounded-full bg-chalk/25" />
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
        <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 md:py-32 lg:px-14">
            <Reveal>
                <p className="text-base font-medium text-leaf">{note}</p>
                <h2 className="font-display mt-2 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-chalk sm:text-[3.5rem]">
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
                    A few projects, and one I <span className="text-gradient">actually traded</span> with.
                </>
            }
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {FEATURED.map((p, i) => (
                    <Reveal key={p.name} delay={i} className={p.wide ? "md:col-span-2" : undefined}>
                        <ProjectCard project={p} />
                    </Reveal>
                ))}
            </div>
            <Reveal>
                <Link
                    href="/portfolio"
                    className="group mt-8 inline-flex items-center gap-2 text-chalk/70 transition-colors hover:text-chalk"
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

const DOT_COLORS = ["bg-leaf", "bg-moss", "bg-mint", "bg-fern", "bg-stone"]

function Experience() {
    return (
        <Section id="experience" note="where I've been hanging out" title="Jobs, research, and some stuff in between.">
            <ol className="relative ml-2 border-l border-dashed border-chalk/15">
                {EXPERIENCE.map((role, i) => (
                    <li key={role.title + role.org} className="relative pb-10 pl-8 last:pb-0 md:pl-12">
                        <span
                            className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full ring-4 ring-background ${DOT_COLORS[i % DOT_COLORS.length]}`}
                        />
                        <Reveal delay={i}>
                            <div className="rounded-3xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-chalk/20 md:p-7">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                                    <h3 className="text-xl font-semibold text-chalk">{role.title}</h3>
                                    <span className="text-sm text-chalk/45">{role.when}</span>
                                </div>
                                <p className="mt-0.5 text-chalk/60">
                                    {role.href ? (
                                        <a href={role.href} target="_blank" rel="noopener noreferrer" className="underline decoration-leaf/40 underline-offset-4 hover:text-leaf">
                                            {role.org}
                                        </a>
                                    ) : (
                                        role.org
                                    )}
                                </p>
                                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-chalk/60">
                                    {role.points.map((pt) => (
                                        <li key={pt} className="flex gap-3">
                                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-chalk/25" />
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
                        <p className="eyebrow text-moss">school (still going)</p>
                        <h3 className="font-display text-2xl font-medium text-chalk">{EDUCATION.school}</h3>
                        <p className="text-chalk/60">
                            {EDUCATION.degree}, probably done around {EDUCATION.grad}
                        </p>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-chalk/55">
                        {EDUCATION.honors}.
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
    { icon: Globe2, title: "Competitive GeoGuessr", body: "Basically pattern recognition on a timer." },
    { icon: BookOpen, title: "Minor in English", body: "I like writing things, not just code." },
    { icon: Gamepad2, title: "Games as math problems", body: "I built an elixir tracker for Clash Royale." },
    { icon: Plane, title: "Traveling", body: "Whenever I get the chance." },
]

function About() {
    return (
        <Section id="about" note="a bit more about me" title="I like problems where you find out if you were right.">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="space-y-6 lg:col-span-7">
                    <Reveal>
                        <p className="text-lg leading-relaxed text-chalk/70 md:text-xl">
                            Artemis kind of started as a random question: do Kalshi and Polymarket ever price the
                            same thing far enough apart to make money after fees? Sometimes, it turns out. It slowly
                            turned into a C++ project, and then something I tried with my own money.
                        </p>
                    </Reveal>
                    <Reveal delay={1}>
                        <p className="leading-relaxed text-chalk/55">
                            I try to test things before I trust them, which is maybe the closest thing I have to a
                            philosophy. At DFW that meant swapping some manual spot-checks for actual tests. On the
                            side I&apos;ve been helping with research on fuzzing and wireless signals, and losing a
                            bit too much sleep to GeoGuessr.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        {[
                            { v: 13000, p: "$", s: "", d: 0, l: "arbitrage profit", c: "text-mint" },
                            { v: 50, p: "~", s: "ns", d: 0, l: "per tick", c: "text-fern" },
                            { v: 3, p: "", s: "", d: 0, l: "hackathon prizes", c: "text-moss" },
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
                                    <div className="mt-1 text-xs text-chalk/45">{stat.l}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <Reveal delay={1}>
                        <p className="mb-4 eyebrow text-moss">when I&apos;m not coding</p>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            {OFF_THE_CLOCK.map((f) => (
                                <li
                                    key={f.title}
                                    className="flex gap-4 rounded-2xl border border-hairline bg-surface p-4 transition-colors hover:border-leaf/30"
                                >
                                    <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                                    <div>
                                        <p className="font-semibold text-chalk">{f.title}</p>
                                        <p className="text-sm text-chalk/55">{f.body}</p>
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
        <Section id="stack" note="my toolbox" title="Stuff I tend to reach for.">
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
                <div className="relative overflow-hidden rounded-3xl border border-leaf/25 bg-surface p-8 text-chalk md:p-12">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-leaf/10 blur-3xl" />
                    <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-12">
                        <div className="md:col-span-7">
                            <p className="eyebrow">the boring-but-useful part</p>
                            <h2 className="font-display mt-1 text-4xl font-medium leading-tight sm:text-5xl">
                                If you want the short version, here&apos;s my resume.
                            </h2>
                            <p className="mt-4 max-w-md text-chalk/65">
                                Pretty much everything above, squished onto one page. Last touched in{" "}
                                {RESUME_UPDATED}.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href={RESUME_URL}
                                    download={RESUME_FILENAME}
                                    className="group inline-flex items-center gap-2 rounded-full bg-leaf px-7 py-3.5 text-sm font-bold text-background transition-colors hover:bg-mint"
                                >
                                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                                    Download PDF
                                </a>
                                <Link
                                    href="/resume"
                                    className="inline-flex items-center gap-2 rounded-full border border-chalk/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-chalk/50 hover:bg-chalk/5"
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
                                className="block w-56 rounded-lg border border-hairline bg-[#eef3ef] p-5 shadow-2xl transition-transform duration-500 hover:-translate-y-1"
                            >
                                <div className="mx-auto h-2.5 w-24 rounded-full bg-[#0b1410]/80" />
                                <div className="mx-auto mt-2 h-1.5 w-36 rounded-full bg-[#0b1410]/25" />
                                {["w-16", "w-20", "w-14", "w-12"].map((w, i) => (
                                    <div key={i} className="mt-4">
                                        <div className={`h-1.5 ${w} rounded-full bg-leaf`} />
                                        <div className="mt-2 space-y-1.5">
                                            <div className="h-1 w-full rounded-full bg-[#0b1410]/15" />
                                            <div className="h-1 w-11/12 rounded-full bg-[#0b1410]/15" />
                                            <div className="h-1 w-4/5 rounded-full bg-[#0b1410]/15" />
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
                <p className="eyebrow text-leaf">say hi!</p>
                <h2 className="font-display mx-auto mt-2 max-w-3xl text-5xl font-medium leading-[1.05] text-chalk sm:text-6xl md:text-7xl">
                    Feel free to <span className="text-gradient">reach out</span>.
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-chalk/60">
                    I&apos;m looking for software, trading, or research roles for 2027. I&apos;m
                    in Dallas but could probably move. Or just say hi, I&apos;m always down to talk about markets.
                </p>
            </Reveal>

            <Reveal delay={2}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <Magnetic strength={22}>
                        <a
                            href="mailto:odeyjeffs7@gmail.com"
                            className="group inline-flex items-center gap-3 rounded-full bg-chalk px-8 py-4 text-sm font-bold text-background transition-colors"
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
                        className="grid h-13 w-13 place-items-center rounded-full border border-hairline p-4 text-chalk/60 transition-all hover:border-chalk/40 hover:text-chalk"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/odeydj/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-13 w-13 place-items-center rounded-full border border-hairline p-4 text-chalk/60 transition-all hover:border-chalk/40 hover:text-chalk"
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
    const links = [
        { label: "Email", href: "mailto:odeyjeffs7@gmail.com" },
        { label: "GitHub", href: "https://github.com/Odey340" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/odeydj/" },
        { label: "Resume", href: RESUME_URL },
    ]
    return (
        <footer className="relative overflow-hidden border-t border-hairline px-5 pt-12 sm:px-8 lg:px-14">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-chalk/45 sm:flex-row sm:items-center sm:justify-between">
                <span>© {new Date().getFullYear()} Odey Jeffs</span>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {links.map((l) => (
                        <li key={l.label}>
                            <a
                                href={l.href}
                                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                className="transition-colors hover:text-chalk"
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="https://github.com/Odey340/Website" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-chalk">
                            Source
                        </a>
                    </li>
                </ul>
            </div>
            <p
                aria-hidden
                className="font-display mx-auto mt-10 max-w-6xl select-none whitespace-nowrap text-[19vw] font-bold leading-[0.78] tracking-[-0.06em] text-chalk/[0.06] lg:text-[13.5rem]"
            >
                odey jeffs
            </p>
        </footer>
    )
}
