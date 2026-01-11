"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

// 2025 Performance Data (Monthly) ending at 38.07%
const data = [
    { month: "Jan", fund: 3.2, spy: 1.5 },
    { month: "Feb", fund: 7.8, spy: 2.8 },
    { month: "Mar", fund: 12.4, spy: 4.1 },
    { month: "Apr", fund: 11.2, spy: 5.5 }, // Slight drawdown
    { month: "May", fund: 16.8, spy: 6.2 },
    { month: "Jun", fund: 21.5, spy: 8.4 },
    { month: "Jul", fund: 25.1, spy: 9.1 },
    { month: "Aug", fund: 24.2, spy: 7.8 }, // Earnings volatility
    { month: "Sep", fund: 29.8, spy: 8.5 },
    { month: "Oct", fund: 33.4, spy: 9.2 },
    { month: "Nov", fund: 36.1, spy: 10.5 },
    { month: "Dec", fund: 38.07, spy: 11.2 }, // Final 38.07%
]

export function BacktestChart() {
    return (
        <Card className="bg-zinc-950/50 border-zinc-800/50 overflow-hidden backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold tracking-tight text-white">
                        Lumina Alpha Generator
                    </CardTitle>
                    <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
                        Cumulative Returns // FY 2025
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,157,0.5)]" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">Lumina</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">S&P 500</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-[350px] w-full pr-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorFund" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00ff9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis
                            dataKey="month"
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
                            tickFormatter={(value) => `${value}%`}
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
                            itemStyle={{ color: "#00ff9d" }}
                            cursor={{ stroke: '#27272a', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="fund"
                            stroke="#00ff9d"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorFund)"
                            dot={{ fill: '#00ff9d', r: 0, strokeWidth: 2, stroke: '#00ff9d' }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="spy"
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
