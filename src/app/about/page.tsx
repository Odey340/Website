import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { MapPin, User, Briefcase, GraduationCap, Repeat, Ruler, Scale, Download } from "lucide-react"
import { EDUCATION, EXPERIENCE } from "@/content/projects"
import { RESUME_FILENAME, RESUME_URL } from "@/content/resume"

export const metadata = {
    title: "About | Odey Jeffs",
    description:
        "C++ and Python engineer focused on trading systems, measurement, and reproducible research. UT Tyler CS, graduating May 2027.",
}

const PRINCIPLES = [
    {
        icon: Scale,
        color: "text-primary",
        hover: "hover:border-primary/50",
        title: "Fees are sneaky",
        body: "A price gap doesn't mean much until you count fees, depth, and the chance only one side fills. Artemis tries to size trades off the real order book and rounds fees up, just in case.",
    },
    {
        icon: Repeat,
        color: "text-blue-400",
        hover: "hover:border-blue-500/50",
        title: "Same answer twice",
        body: "If a result changes between runs, I probably don't have a result yet. My backtester gives the same P&L every run, even across GCC, Clang, and MSVC.",
    },
    {
        icon: Ruler,
        color: "text-white",
        hover: "hover:border-white/50",
        title: "Numbers, with context",
        body: "I try to say how I got a number, not just the number: like 100,000 ticks in about 45 ms, or an R² of 0.9997 under 5-fold cross-validation. Usually I'll double check against a second implementation too.",
    },
]

export default function AboutPage() {
    const current = EXPERIENCE[0]

    return (
        <main className="container max-w-5xl py-12 md:py-24 space-y-20">
            {/* Header */}
            <div className="space-y-4">
                <p className="eyebrow text-leaf">the longer version, if you&apos;re curious</p>
                <h1 className="font-display text-5xl md:text-7xl font-medium">About me</h1>
                <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                    I mostly mess around with <span className="text-white font-medium">trading stuff in C++</span> and
                    try to check it properly, with <span className="text-white font-medium">some stats, tests, and a bit of real money</span>.
                </p>
            </div>

            {/* Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <Card className="md:col-span-8 bg-zinc-950/50 border-zinc-900 backdrop-blur-sm p-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white font-bold tracking-tight">
                            <User className="w-5 h-5 text-primary" /> How I ended up here
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                        <p>
                            I&apos;m a CS student at UT Tyler, wrapping up in May 2027. I kind of
                            fell into markets with one question: when Kalshi and Polymarket list the same event, do
                            their prices ever disagree by more than the fees? I wrote{" "}
                            <Link href="/projects/artemis" className="text-white font-semibold italic underline decoration-zinc-700 underline-offset-4 hover:decoration-primary">
                                Artemis
                            </Link>{" "}
                            in C++ to find out, tried it with my own money, and somehow ended up around{" "}
                            <span className="text-white font-semibold">$13,000</span> up, mostly on second-tier ice
                            hockey and women&apos;s college basketball markets.
                        </p>
                        <p>
                            That project kind of taught me the idea is usually the easy part. The hard part is the
                            fill you didn&apos;t get, the fee you rounded wrong, and the backtest that&apos;s a little too
                            nice to you. So I made Olly, a tick-level futures backtester that runs at roughly{" "}
                            <span className="text-white font-semibold">50 nanoseconds per tick</span>, fills orders
                            at the bid or ask with slippage and commissions, and gives the same P&amp;L each run.
                        </p>
                        <p>
                            My internships and research have mostly been on the data side of things: shipping financial-data
                            features at Jump Finance, checking the data behind demand forecasts at DFW Airport, trying LLMs in a fuzzing workflow at UT Dallas, and poking at wireless signal
                            measurements on embedded hardware at UT Tyler.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-4">
                            {["C++17", "Python", "SQL", "R", "MATLAB", "Linux"].map((t) => (
                                <Badge key={t} variant="secondary" className="bg-zinc-900/50 hover:bg-zinc-800">
                                    {t}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar */}
                <div className="md:col-span-4 space-y-6">
                    <Card className="bg-zinc-950/50 border-zinc-900 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Currently
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-white text-lg">{current.org}</p>
                            <p className="text-sm text-zinc-400">{current.title}</p>
                            <p className="text-[10px] font-mono text-primary mt-2 uppercase tracking-tighter">{current.when}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-950/50 border-zinc-900 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" /> Education
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-white text-lg">B.S. Computer Science</p>
                            <p className="text-sm text-zinc-400">UT Tyler, minor in English</p>
                            <p className="text-[10px] font-mono text-primary mt-2 uppercase tracking-tighter">Graduating May 2027</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-950/50 border-zinc-900 border-dashed">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" /> Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                                <p className="text-white font-bold">Dallas, TX</p>
                                <Badge variant="outline" className="text-[10px] border-zinc-800">Central Time</Badge>
                            </div>
                            <p className="text-xs text-zinc-500 italic">Could probably move, depending.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Experience */}
            <div className="space-y-8">
                <h2 className="font-display text-4xl font-medium">Experience</h2>
                <div className="divide-y divide-zinc-900 border-y border-zinc-900">
                    {EXPERIENCE.map((role) => (
                        <div key={role.title + role.org} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
                            <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-zinc-500 md:pt-1.5">
                                <div className="text-primary">{role.when}</div>
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-xl font-bold text-white">{role.title}</h3>
                                <p className="text-zinc-400">
                                    {role.href ? (
                                        <a href={role.href} target="_blank" rel="noopener noreferrer" className="underline decoration-zinc-700 underline-offset-4 hover:text-white">
                                            {role.org}
                                        </a>
                                    ) : (
                                        role.org
                                    )}
                                </p>
                                <ul className="mt-3 space-y-2 text-sm text-zinc-400 leading-relaxed list-disc pl-5 marker:text-zinc-700">
                                    {role.points.map((pt) => (
                                        <li key={pt}>{pt}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                    <span className="text-zinc-300">Coursework:</span> {EDUCATION.coursework.join(", ")}.{" "}
                    <span className="text-zinc-300">Honors:</span> {EDUCATION.honors}.
                </p>
            </div>

            {/* Principles */}
            <div className="space-y-10">
                <h2 className="font-display text-4xl font-medium">Stuff I try to do</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PRINCIPLES.map((p) => (
                        <div
                            key={p.title}
                            className={`p-8 rounded-3xl border border-zinc-900 bg-zinc-950/30 space-y-4 transition-all duration-500 ${p.hover}`}
                        >
                            <p.icon className={`w-10 h-10 ${p.color}`} />
                            <h3 className="text-xl font-bold">{p.title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">{p.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="pt-12 border-t border-zinc-900 text-center">
                <p className="eyebrow text-moss mb-6">hiring for 2027, maybe?</p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <a href={RESUME_URL} download={RESUME_FILENAME} className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-[1.03]">
                        <Download className="h-4 w-4" /> Download my resume
                    </a>
                    <Link href="/contact" className="text-white hover:text-primary transition-colors font-semibold text-lg underline decoration-zinc-700 underline-offset-8">
                        Say hi &rarr;
                    </Link>
                </div>
            </div>
        </main>
    )
}
