"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const data = [
    { time: "09:30", alpha: 0.0 },
    { time: "10:00", alpha: 0.12 },
    { time: "10:30", alpha: 0.15 },
    { time: "11:00", alpha: 0.22 },
    { time: "11:30", alpha: 0.28 },
    { time: "12:00", alpha: 0.45 },
    { time: "12:30", alpha: 0.48 },
    { time: "13:00", alpha: 0.52 },
    { time: "13:30", alpha: 0.61 },
    { time: "14:00", alpha: 0.75 },
    { time: "14:30", alpha: 0.79 },
    { time: "15:00", alpha: 0.82 }, // Peak
    { time: "15:30", alpha: 0.81 },
    { time: "16:00", alpha: 0.82 },
]

export function BacktestChart() {
    return (
        <Card className="bg-card/50 border-border/50">
            <CardHeader>
                <CardTitle className="text-sm font-mono text-muted-foreground">LUMINA_ALPHA_VS_S&P500</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "4px" }}
                            itemStyle={{ color: "#00ff9d" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="alpha"
                            stroke="#00ff9d"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0, fill: "#fff" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
