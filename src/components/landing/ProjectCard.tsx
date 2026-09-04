"use client"

import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { SpotlightCard } from "./SpotlightCard"

export type Project = {
    name: string
    kind: string
    blurb: string
    stat: { label: string; value: string }
    stack: string[]
    href: string
    source?: string
    glow: string
    index: string
}

/** Featured-work card: cursor spotlight + hover lift, links through to the case page. */
export function ProjectCard({ project }: { project: Project }) {
    return (
        <SpotlightCard
            glow={project.glow}
            className="h-full transition-transform duration-300 hover:-translate-y-1"
        >
            <Link href={project.href} className="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-white/30">{project.index}</span>
                    <span
                        className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                        style={{ borderColor: `rgb(${project.glow} / 0.35)`, color: `rgb(${project.glow})` }}
                    >
                        {project.kind}
                    </span>
                </div>

                <h3 className="mt-5 flex items-center gap-1.5 text-2xl font-semibold tracking-tight text-white">
                    {project.name}
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{project.blurb}</p>

                <div className="mt-6 flex items-end justify-between border-t border-hairline pt-4">
                    <div>
                        <div className="font-mono text-lg font-semibold tabular-nums text-white">{project.stat.value}</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">{project.stat.label}</div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                        {project.stack.map((s) => (
                            <span key={s} className="rounded bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-white/45">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>

            {project.source && (
                <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 z-20 rounded-md p-1.5 text-white/30 transition-colors hover:bg-white/5 hover:text-white"
                    aria-label={`${project.name} source`}
                >
                    <Github className="h-4 w-4" />
                </a>
            )}
        </SpotlightCard>
    )
}
