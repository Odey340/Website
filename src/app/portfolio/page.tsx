import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Folder, Github, ExternalLink, ArrowRight } from "lucide-react"

export const metadata = {
    title: 'Portfolio | Odey Jeffs',
    description: 'Technical projects and research.',
}

export default function PortfolioPage() {
    return (
        <main className="container max-w-6xl py-12 md:py-24 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Portfolio</h1>
                <p className="text-xl text-muted-foreground font-mono">
          // Selected works in Systems Engineering & Quantitative Analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Lumina */}
                <div className="group relative">
                    <Link href="/projects/lumina">
                        <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer flex flex-col bg-card/60">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Folder className="w-5 h-5 text-primary" />
                                    <Badge variant="terminal" className="text-[10px] py-0">FUND</Badge>
                                </div>
                                <CardTitle className="group-hover:text-primary transition-colors flex items-center gap-2">
                                    Lumina
                                </CardTitle>
                                <CardDescription>Lumina Quant Fund | +38.07% YTD</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between">
                                <p className="text-sm text-muted-foreground mb-6">
                                    Proprietary trading engine utilizing mean reversion statistics timed with earnings call volatility to generate superior risk-adjusted returns.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">C++20</Badge>
                                    <Badge variant="secondary">HFT</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <div className="absolute bottom-4 right-4">
                        <a
                            href="https://github.com/Odey340/luminafund"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-primary text-zinc-400 hover:text-primary transition-all shadow-xl"
                            title="View Source on GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Artemis */}
                <div className="group relative">
                    <Link href="/projects/artemis">
                        <Card className="h-full hover:border-blue-500/50 transition-colors cursor-pointer flex flex-col bg-card/60">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Folder className="w-5 h-5 text-blue-400" />
                                    <Badge variant="outline" className="text-[10px] py-0 border-blue-500/50 text-blue-400">ENGINE</Badge>
                                </div>
                                <CardTitle className="group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                    Artemis
                                </CardTitle>
                                <CardDescription>System Reliability Engine | 99.999% Determinism</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between">
                                <p className="text-sm text-muted-foreground mb-6">
                                    High-precision benchmarking suite utilizing RDTSC profiling and kernel-bypass measurement to isolate system noise from true application performance.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Rust</Badge>
                                    <Badge variant="secondary">RDTSC</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <div className="absolute bottom-4 right-4">
                        <a
                            href="https://github.com/Odey340"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-blue-400 text-zinc-400 hover:text-blue-400 transition-all shadow-xl"
                            title="View Profile on GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* ClashWinner */}
                <div className="group relative">
                    <Card className="h-full border-border bg-card/60 hover:border-zinc-700 transition-colors flex flex-col relative overflow-hidden">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <Folder className="w-5 h-5 text-amber-500" />
                                <Badge variant="secondary" className="text-[10px] py-0 bg-zinc-800">MOBILE</Badge>
                            </div>
                            <CardTitle className="text-foreground flex items-center gap-2">
                                ClashWinner
                            </CardTitle>
                            <CardDescription>Clash Royale Turnaround Optimizer</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                            <p className="text-sm text-muted-foreground mb-6">
                                Mobile app that optimizes clash royale turnarounds. overlays on top of the game to show optimal moves.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Python</Badge>
                                <Badge variant="secondary">Simulation</Badge>
                            </div>
                        </CardContent>
                        <div className="absolute bottom-4 right-4">
                            <a
                                href="https://github.com/Odey340"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-zinc-500 transition-all shadow-xl"
                                title="View on GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}
