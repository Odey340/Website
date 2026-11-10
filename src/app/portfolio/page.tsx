import { ProjectCard } from "@/components/landing/ProjectCard"
import { FEATURED, MORE } from "@/content/projects"

export const metadata = {
    title: "Projects | Odey Jeffs",
    description: "Trading systems, backtesting, statistical modeling, and data pipelines.",
}

export default function PortfolioPage() {
    return (
        <main className="container max-w-6xl py-12 md:py-24 space-y-12">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
                <p className="text-xl text-muted-foreground font-mono">
                    {`// Trading systems, backtesting, modeling, and data pipelines.`}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURED.map((p) => (
                    <ProjectCard key={p.name} project={p} />
                ))}
            </div>

            <div className="space-y-6">
                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">Earlier and side projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MORE.map((p) => (
                        <ProjectCard key={p.name} project={p} />
                    ))}
                </div>
            </div>
        </main>
    )
}
