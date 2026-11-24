import { ImageResponse } from "next/og"
import { buildPath } from "@/components/landing/EquityCurve"

export const alt = "Odey Jeffs: I mostly build trading stuff and data apps"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BG = "#0b1410"
const CHALK = "#e3ece5"
const LEAF = "#4fd182"

/** Fetch a Google font as TTF for Satori. Falls back to the default font if offline. */
async function loadFont(family: string, weight: number) {
    try {
        const css = await (
            await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`)
        ).text()
        const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
        if (!url) return null
        return await (await fetch(url)).arrayBuffer()
    } catch {
        return null
    }
}

export default async function OpengraphImage() {
    const [bold, medium] = await Promise.all([loadFont("Space+Grotesk", 700), loadFont("Space+Grotesk", 500)])
    const fonts = [
        ...(bold ? [{ name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const }] : []),
        ...(medium ? [{ name: "Space Grotesk", data: medium, weight: 500 as const, style: "normal" as const }] : []),
    ]

    const W = 1200
    const H = 200
    const pts = buildPath(W, H, 64)
    const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
    const area = `${line} L${W} ${H} L0 ${H} Z`
    const end = pts[pts.length - 1]

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: BG,
                    color: CHALK,
                    fontFamily: fonts.length ? "Space Grotesk" : undefined,
                    position: "relative",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "56px 72px 0" }}>
                    <div
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: 12,
                            background: LEAF,
                            color: BG,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 22,
                            fontWeight: 700,
                        }}
                    >
                        OJ
                    </div>
                    <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em" }}>odey jeffs</div>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "40px 72px 0",
                        fontSize: 84,
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.045em",
                    }}
                >
                    <span>I mostly build</span>
                    <span style={{ color: LEAF }}>trading stuff</span>
                    <span>and data apps.</span>
                </div>

                <svg
                    width={W}
                    height={H}
                    viewBox={`0 0 ${W} ${H}`}
                    style={{ position: "absolute", left: 0, bottom: 0 }}
                >
                    <path d={area} fill={LEAF} fillOpacity={0.12} />
                    <path d={line} fill="none" stroke={LEAF} strokeWidth={4} strokeLinejoin="round" />
                    <circle cx={end[0] - 6} cy={end[1]} r={9} fill={LEAF} />
                </svg>

                <div
                    style={{
                        position: "absolute",
                        right: 40,
                        bottom: H - end[1] + 22,
                        display: "flex",
                        padding: "8px 14px",
                        borderRadius: 10,
                        border: `2px solid ${LEAF}55`,
                        background: BG,
                        color: LEAF,
                        fontSize: 24,
                        fontWeight: 500,
                    }}
                >
                    +$13k, give or take
                </div>
            </div>
        ),
        { ...size, fonts: fonts.length ? fonts : undefined },
    )
}
