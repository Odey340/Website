import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { MapPin, User, Briefcase, GraduationCap, Repeat, Ruler, Scale, Terminal } from "lucide-react"
import { EDUCATION, EXPERIENCE } from "@/content/projects"

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
        title: "Edge after costs",
        body: "A price gap is not a trade until it survives fees, depth, and the chance that one leg fills and the other does not. Artemis sizes every trade against the real order book and counts fees rounded up.",
    },
    {
        icon: Repeat,
        color: "text-blue-400",
        hover: "hover:border-blue-500/50",
        title: "Reproducibility",
        body: "If a result changes between runs, I don't have a result yet. My backtester produces identical P&L on every run and bit-identical output across GCC and Clang.",
    },
    {
        icon: Ruler,
        color: "text-white",
        hover: "hover:border-white/50",
        title: "Measured, not assumed",
        body: "I report numbers with their conditions: 100,000 ticks in about 45 ms, 38 ms at p99, R² of 0.9997 under 5-fold cross-validation. Estimators are verified against an independent implementation.",
    },
]

export default function AboutPage() {
    const current = EXPERIENCE[0]

    return (
        <main className="container max-w-5xl py-12 md:py-24 space-y-20">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-[.3em] uppercase">
                    <Terminal className="w-4 h-4" />
                    <span>Background</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic">About Me</h1>
                <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                    I build <span className="text-white font-medium">trading systems in C++</span> and check them the
                    way a researcher would: with <span className="text-white font-medium">statistics, tests, and real money</span>.
                </p>
            </div>

            {/* Narrative */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <Card className="md:col-span-8 bg-zinc-950/50 border-zinc-900 backdrop-blur-sm p-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white font-bold tracking-tight">
                            <User className="w-5 h-5 text-primary" /> How I got here
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                        <p>
                            I&apos;m a computer science student at UT Tyler, graduating in May 2027. I got into markets
                            by asking a narrow question: when Kalshi and Polymarket list the same event, do their
                            prices ever disagree by more than the fees? I wrote{" "}
                            <Link href="/projects/artemis" className="text-white font-semibold italic underline decoration-zinc-700 underline-offset-4 hover:decoration-primary">
                                Artemis
                            </Link>{" "}
                            in C++ to find out, traded it with my own money, and made{" "}
                            <span className="text-white font-semibold">$13,000</span> on second-tier ice hockey and
                            women&apos;s college basketball markets.
                        </p>
                        <p>
                            That project taught me that the hard part is rarely the idea. It is the fill you did not
                            get, the fee you rounded the wrong way, and the backtest that flatters you. So I built a
                            tick-level futures backtester that runs at about{" "}
                            <span className="text-white font-semibold">450 nanoseconds per tick</span>, models
                            slippage and commissions on every trade, and reproduces the same P&amp;L every run.
                        </p>
                        <p>
                            My internships have been on the data side of the same problem: validating the inputs to
                            demand forecasts at DFW Airport, quantifying measurement uncertainty in wireless signal
                            data as a research assistant, and shipping tested financial-data features at Jump Finance.
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
                            <p className="text-sm text-zinc-400">UT Tyler · Minor in English</p>
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
                            <p className="text-xs text-zinc-500 italic">Open to relocation.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Experience */}
            <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                <div className="divide-y divide-zinc-900 border-y border-zinc-900">
                    {EXPERIENCE.map((role) => (
                        <div key={role.title + role.org} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
                            <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-zinc-500 md:pt-1.5">
                                <div className="text-primary">{role.when}</div>
                                <div className="mt-1">{role.where}</div>
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-xl font-bold text-white">{role.title}</h3>
                                <p className="text-zinc-400">{role.org}</p>
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
                <h2 className="text-3xl font-bold tracking-tight">How I work</h2>
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
                <p className="text-zinc-500 text-sm mb-6 uppercase tracking-widest font-mono">Hiring for 2027?</p>
                <div className="flex justify-center gap-4">
                    <Link href="/contact" className="text-white hover:text-primary transition-colors font-bold text-lg underline decoration-zinc-800 underline-offset-8">
                        Get in touch &rarr;
                    </Link>
                </div>
            </div>
        </main>
    )
}
