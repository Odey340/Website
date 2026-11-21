"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink, Github, Trophy } from "lucide-react"
import { SpotlightCard } from "./SpotlightCard"

export type Project = {
    name: string
    kind: string
    blurb: string
    stat: { label: string; value: string }
    stack: string[]
    href: string
    /** Open the main card link in a new tab (for links to a live external site). */
    external?: boolean
    source?: string
    /** Devpost submission link, rendered next to the GitHub source link. */
    devpost?: string
    /** Small award/sponsor logos shown under the header (e.g. host university, sponsor tracks). */
    badges?: { src: string; alt: string }[]
    /** Short award callout, e.g. "HackRice 16 — MathWorks & Backboard Track Winner". */
    award?: string
    glow: string
    index: string
    /** Span both columns in the project grid (used for the featured startup). */
    wide?: boolean
}

/** Featured-work card: cursor spotlight + hover lift, links through to the case page (or out to a live site). */
export function ProjectCard({ project }: { project: Project }) {
    const iconCount = (project.source ? 1 : 0) + (project.devpost ? 1 : 0)

    const cardInner = (
        <>
            <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-chalk/30">no. {project.index}</span>
                <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `rgb(${project.glow} / 0.15)`, color: `rgb(${project.glow})` }}
                >
                    {project.kind}
                </span>
            </div>

            <h3 className="font-display mt-5 flex items-center gap-1.5 text-3xl font-medium text-chalk">
                {project.name}
                <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </h3>

            {project.badges && project.badges.length > 0 && (
                <div className="mt-3 flex items-center gap-3">
                    {project.badges.map((b) => (
                        <div key={b.src} className="relative h-6 w-14 opacity-80">
                            <Image src={b.src} alt={b.alt} fill className="object-contain object-left" />
                        </div>
                    ))}
                </div>
            )}

            {project.award && (
                <div
                    className="mt-3 flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: `rgb(${project.glow})` }}
                >
                    <Trophy className="h-3 w-3" />
                    {project.award}
                </div>
            )}

            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-chalk/60">{project.blurb}</p>

            <div className="mt-6 flex items-end justify-between border-t border-hairline pt-4">
                <div>
                    <div className="font-display text-2xl font-semibold tabular-nums" style={{ color: `rgb(${project.glow})` }}>{project.stat.value}</div>
                    <div className="text-xs text-chalk/45">{project.stat.label}</div>
                </div>
                <div
                    className="flex flex-wrap justify-end gap-1.5"
                    style={iconCount > 0 ? { paddingRight: iconCount * 28 } : undefined}
                >
                    {project.stack.map((s) => (
                        <span key={s} className="rounded-full bg-chalk/[0.06] px-2.5 py-0.5 text-[11px] text-chalk/55">
                            {s}
                        </span>
                    ))}
                </div>
            </div>
        </>
    )

    return (
        <SpotlightCard
            glow={project.glow}
            className="h-full transition-transform duration-300 hover:-translate-y-1"
        >
            {project.external ? (
                <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col p-6 md:p-7"
                >
                    {cardInner}
                </a>
            ) : (
                <Link href={project.href} className="flex h-full flex-col p-6 md:p-7">
                    {cardInner}
                </Link>
            )}

            {(project.source || project.devpost) && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1">
                    {project.devpost && (
                        <a
                            href={project.devpost}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md p-1.5 text-chalk/35 transition-colors hover:bg-chalk/5 hover:text-chalk"
                            aria-label={`${project.name} on Devpost`}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                    {project.source && (
                        <a
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md p-1.5 text-chalk/35 transition-colors hover:bg-chalk/5 hover:text-chalk"
                            aria-label={`${project.name} source`}
                        >
                            <Github className="h-4 w-4" />
                        </a>
                    )}
                </div>
            )}
        </SpotlightCard>
    )
}
