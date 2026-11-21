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
                <p className="font-hand text-2xl text-tangerine">things I&apos;ve made</p>
                <h1 className="font-display text-5xl font-medium md:text-6xl">Projects</h1>
                <p className="text-lg text-cream/60">
                    Trading systems, backtesting, modeling, data pipelines, and a few just-for-fun builds.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURED.map((p) => (
                    <ProjectCard key={p.name} project={p} />
                ))}
            </div>

            <div className="space-y-6">
                <h2 className="font-hand text-2xl text-butter">earlier &amp; side projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MORE.map((p) => (
                        <ProjectCard key={p.name} project={p} />
                    ))}
                </div>
            </div>
        </main>
    )
}
