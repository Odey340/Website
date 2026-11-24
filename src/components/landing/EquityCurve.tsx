/**
 * A P&L-style line that draws itself once across the bottom of the hero and
 * ends on a "+$13k" marker. The path is generated from a fixed seed so the
 * server and client render the same shape.
 */

export function buildPath(width: number, height: number, steps: number) {
    let seed = 7
    const rand = () => {
        seed = (seed * 16807) % 2147483647
        return seed / 2147483647
    }
    const pts: [number, number][] = []
    let y = height * 0.82
    for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width
        // upward drift with noise, plus one drawdown around the middle
        const drift = -height * 0.0105
        const dip = i > steps * 0.42 && i < steps * 0.52 ? height * 0.03 : 0
        y += drift + dip + (rand() - 0.5) * height * 0.06
        y = Math.min(height * 0.95, Math.max(height * 0.08, y))
        pts.push([x, y])
    }
    return pts
}

const W = 1200
const H = 180
const PTS = buildPath(W, H, 64)
const LINE = PTS.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
const AREA = `${LINE} L${W} ${H} L0 ${H} Z`
const END = PTS[PTS.length - 1]

export function EquityCurve() {
    return (
        <div aria-hidden className="pointer-events-none relative h-[140px] w-full sm:h-[180px]">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                <defs>
                    <linearGradient id="eq-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--leaf)" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="var(--leaf)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* baseline */}
                <line x1="0" x2={W} y1={H * 0.82} y2={H * 0.82} stroke="var(--hairline)" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
                <path d={AREA} fill="url(#eq-fill)" className="eq-area" />
                <path
                    d={LINE}
                    fill="none"
                    stroke="var(--leaf)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                    className="eq-line"
                />
            </svg>
            {/* end marker, positioned in % so it tracks the stretched svg */}
            <div
                className="eq-marker absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: "calc(100% - 5px)", top: `${(END[1] / H) * 100}%` }}
            >
                <span className="block h-2.5 w-2.5 rounded-full bg-leaf shadow-[0_0_0_4px_rgba(79,209,130,0.18)]" />
                <span className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-md border border-leaf/30 bg-background px-2.5 py-1 text-xs font-semibold text-leaf">
                    +$13k, give or take
                </span>
            </div>
        </div>
    )
}

const PLACES = ["DFW Airport", "Jump Finance", "UT Dallas", "UT Tyler", "HackRice 16", "HackUTA"]

export function PlacesStrip() {
    return (
        <div className="flex flex-col gap-4 border-t border-hairline pt-6 md:flex-row md:items-center md:gap-10">
            <p className="shrink-0 text-sm text-chalk/45">Where I&apos;ve worked, studied, or gotten lucky</p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {PLACES.map((p) => (
                    <li key={p} className="font-display text-lg font-semibold tracking-tight text-chalk/35">
                        {p}
                    </li>
                ))}
            </ul>
        </div>
    )
}
