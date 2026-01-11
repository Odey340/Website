"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Folder, Github, ExternalLink, ArrowRight } from "lucide-react"

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
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">C++20</Badge>
                                        <Badge variant="secondary">HFT</Badge>
                                    </div>
                                    <a
                                        href="https://github.com/Odey340/luminafund"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-primary/5"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                        <span>Source</span>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
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
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">Rust</Badge>
                                        <Badge variant="secondary">RDTSC</Badge>
                                    </div>
                                    <a
                                        href="https://github.com/Odey340"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-blue-400 transition-colors py-1 px-2 rounded-md hover:bg-blue-400/5"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                        <span>Source</span>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
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
                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Python</Badge>
                                    <Badge variant="secondary">Simulation</Badge>
                                </div>
                                <a
                                    href="https://github.com/Odey340"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-amber-500 transition-colors py-1 px-2 rounded-md hover:bg-amber-500/5"
                                >
                                    <Github className="w-3.5 h-3.5" />
                                    <span>Source</span>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
