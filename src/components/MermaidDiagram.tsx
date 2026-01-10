"use client"
import mermaid from "mermaid"
import { useEffect, useRef, useState } from "react"

export function MermaidDiagram({ chart }: { chart: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [svg, setSvg] = useState<string>('')

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'monospace',
        })

        const renderChart = async () => {
            try {
                // Generate a unique ID for each render to prevent conflicts
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
                const { svg } = await mermaid.render(id, chart)
                setSvg(svg)
            } catch (error) {
                console.error("Mermaid failed to render:", error)
            }
        }

        renderChart()
    }, [chart])

    return (
        <div
            className="mermaid overflow-x-auto p-4 bg-black/50 rounded-lg border border-border flex justify-center"
            ref={ref}
            dangerouslySetInnerHTML={{ __html: svg || '<div class="animate-pulse h-32 w-full bg-muted/20 rounded"></div>' }}
        />
    )
}
