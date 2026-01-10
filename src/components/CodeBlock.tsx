"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
    highLevel: string
    lowLevel: string
    title?: string
}

export function CodeBlock({ highLevel, lowLevel, title }: CodeBlockProps) {
    const [mode, setMode] = useState<"high" | "low">("high")

    return (
        <div className="border border-border rounded-lg overflow-hidden my-6 bg-card">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
                <span className="text-xs font-mono text-muted-foreground">{title || "SOURCE_CODE"}</span>
                <div className="flex space-x-2">
                    <Button
                        variant={mode === "high" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setMode("high")}
                        className="text-xs h-7"
                    >
                        High-Level (Logic)
                    </Button>
                    <Button
                        variant={mode === "low" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setMode("low")}
                        className="text-xs h-7"
                    >
                        Low-Level (Optimization)
                    </Button>
                </div>
            </div>
            <div className="p-4 bg-black/90 overflow-x-auto">
                <pre className="font-mono text-sm">
                    <code className={cn("language-cpp", { "text-blue-400": mode === "high", "text-green-400": mode === "low" })}>
                        {mode === "high" ? highLevel.trim() : lowLevel.trim()}
                    </code>
                </pre>
            </div>
        </div>
    )
}
