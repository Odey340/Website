import { ArrowUpRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react"
import { RESUME_FILENAME, RESUME_URL } from "@/content/resume"

export const metadata = {
    title: "Contact | Odey Jeffs",
    description: "Say hi about software engineering, trading, and research roles.",
}

const CHANNELS = [
    {
        icon: Mail,
        label: "Email",
        value: "odeyjeffs7@gmail.com",
        note: "Probably the best way. Roles, project questions, or a market you think is off.",
        href: "mailto:odeyjeffs7@gmail.com",
        color: "bg-tangerine text-[#1f120a]",
        tilt: "-rotate-1",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "in/odeydj",
        note: "Works too, if that's more your thing.",
        href: "https://www.linkedin.com/in/odeydj/",
        color: "bg-sky text-[#10233a]",
        tilt: "rotate-1",
        external: true,
    },
    {
        icon: Github,
        label: "GitHub",
        value: "Odey340",
        note: "Where most of the code ends up.",
        href: "https://github.com/Odey340",
        color: "bg-sage text-[#13261a]",
        tilt: "rotate-[0.5deg]",
        external: true,
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+1 903 556 8277",
        note: "Texting is probably easier.",
        href: "tel:903-556-8277",
        color: "bg-butter text-[#2a1d0c]",
        tilt: "-rotate-[0.5deg]",
    },
]

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-20">
            <div className="max-w-2xl">
                <p className="font-hand text-3xl text-tangerine">hey there</p>
                <h1 className="font-display mt-1 text-5xl font-medium leading-[1.05] text-cream md:text-7xl">
                    Say <span className="italic text-gradient">hi</span>, maybe?
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-cream/60">
                    I&apos;m sort of keeping an eye out for software, trading, or research roles around 2027. I&apos;m
                    in Dallas, but I could probably move. I try to reply pretty fast.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {CHANNELS.map((c) => (
                    <a
                        key={c.label}
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`group relative rounded-3xl p-7 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] ${c.color} ${c.tilt}`}
                    >
                        <div className="flex items-start justify-between">
                            <c.icon className="h-7 w-7" />
                            <ArrowUpRight className="h-5 w-5 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </div>
                        <p className="mt-6 text-sm font-semibold opacity-70">{c.label}</p>
                        <p className="font-display text-2xl font-medium break-all">{c.value}</p>
                        <p className="mt-2 text-sm opacity-75">{c.note}</p>
                    </a>
                ))}
            </div>

            <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-cream/20 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
                <div>
                    <p className="font-display text-2xl text-cream">Need my resume for something?</p>
                    <p className="text-cream/55">It&apos;s one page. Should be easy to pass along.</p>
                </div>
                <a
                    href={RESUME_URL}
                    download={RESUME_FILENAME}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-[#1f120a] transition-transform hover:-rotate-1 hover:scale-[1.03]"
                >
                    <Download className="h-4 w-4" /> Download resume
                </a>
            </div>
        </main>
    )
}
