"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Artemis Performance Data (Nanosecond Jitter / System Noise Isolation)
const data = [
    { time: "00:00", artemis: 120, baseline: 450 },
    { time: "01:00", artemis: 125, baseline: 820 },
    { time: "02:00", artemis: 118, baseline: 560 },
    { time: "03:00", artemis: 122, baseline: 1200 }, // Huge baseline jitter
    { time: "04:00", artemis: 130, baseline: 640 },
    { time: "05:00", artemis: 121, baseline: 490 },
    { time: "06:00", artemis: 115, baseline: 710 },
    { time: "07:00", artemis: 124, baseline: 1500 }, // Morning rush jitter
    { time: "08:00", artemis: 128, baseline: 980 },
    { time: "09:00", artemis: 122, baseline: 620 },
    { time: "10:00", artemis: 119, baseline: 540 },
    { time: "11:00", artemis: 120, baseline: 480 },
]

export function ArtemisChart() {
    return (
        <Card className="bg-zinc-950/50 border-zinc-800/50 overflow-hidden backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold tracking-tight text-white">
                        Artemis Noise Isolation
                    </CardTitle>
                    <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
                        Latency Variance (ns) // Real-Time Benchmarking
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">Artemis</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">OS Default</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[350px] w-full pr-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorArtemis" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#52525b"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#52525b"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}ns`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(9, 9, 11, 0.9)",
                                border: "1px solid rgba(39, 39, 42, 0.5)",
                                borderRadius: "8px",
                                backdropFilter: "blur(4px)",
                                fontSize: "12px",
                                color: "#fff"
                            }}
                            itemStyle={{ color: "#3b82f6" }}
                            cursor={{ stroke: '#27272a', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="artemis"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorArtemis)"
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="baseline"
                            stroke="#52525b"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
