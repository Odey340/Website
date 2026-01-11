import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

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
                <Link href="/projects/lumina">
                    <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group flex flex-col bg-card/60">
                        <CardHeader>
                            <CardTitle className="group-hover:text-primary transition-colors">Lumina</CardTitle>
                            <CardDescription>Lumina Quant Fund | +38.07% YTD</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                            <p className="text-sm text-muted-foreground mb-4">
                                Proprietary trading engine utilizing mean reversion statistics timed with earnings call volatility to generate superior risk-adjusted returns.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">C++20</Badge>
                                <Badge variant="secondary">Statistical Arbitrage</Badge>
                                <Badge variant="secondary">HFT</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                {/* Artemis */}
                <Link href="/projects/artemis">
                    <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group flex flex-col bg-card/60">
                        <CardHeader>
                            <CardTitle className="group-hover:text-primary transition-colors">Artemis</CardTitle>
                            <CardDescription>System Reliability Engine</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                            <p className="text-sm text-muted-foreground mb-4">
                                Micro-second variance analysis for ensuring 99.999% uptime and consistent service delivery.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Rust</Badge>
                                <Badge variant="secondary">Metrics</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                {/* ClashWinner */}
                <Card className="h-full border-border bg-card/60 hover:border-primary/50 transition-colors flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-foreground">ClashWinner</CardTitle>
                        <CardDescription>Clash Royale Turnaround Optimizer</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                        <p className="text-sm text-muted-foreground mb-4">
                            Mobile app that optimizes clash royale turnarounds. overlays on top of the game to show optimal moves.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Python</Badge>
                            <Badge variant="secondary">Simulation</Badge>
                            <Badge variant="secondary">Ops Research</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
