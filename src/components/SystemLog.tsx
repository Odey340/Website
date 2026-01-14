"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

const logLines = [
    "Initialize KERNEL... [OK]",
    "Loading QUANT_MODULE... [OK]",
    "Mounting ORDER_BOOK... [OK]",
    "Connecting to EXCHANGE_GATEWAY... [OK]",
    "Calibrating RDTSC timer... [OK]",
    "Allocating RING_BUFFER (1GB)... [OK]",
    "Prefetching L2 cache lines... [OK]",
    "Starting ALPHA_ENGINE... [OK]",
    "System Ready. Waiting for tick data...",
    "Listening on port 8080...",
    "WARN: High market volatility detected.",
    "Optimization: SIMD instructions enabled.",
    "Memory: Zero-copy networking active.",
]

export function SystemLog() {
    const [lines, setLines] = useState<string[]>([])
    const [index, setIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (index < logLines.length) {
            const timeout = setTimeout(() => {
                setLines((prev) => [...prev, logLines[index]])
                setIndex((prev) => prev + 1)
            }, Math.random() * 300 + 100) // Random delay between 100-400ms
            return () => clearTimeout(timeout)
        }
    }, [index])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [lines])

    return (
        <div
            className="font-mono text-xs text-green-500/80 bg-black/50 border border-green-500/20 p-4 rounded-md h-64 overflow-hidden relative shadow-[0_0_15px_rgba(0,255,157,0.1)] backdrop-blur-sm"
            ref={scrollRef}
        >
            <div className="absolute top-0 right-0 p-2 text-[10px] text-green-500/40">SYS_LOG_V1.0</div>
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {line}
                </motion.div>
            ))}
            {index < logLines.length && (
                <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-2" />
            )}
        </div>
    )
}
