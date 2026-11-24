import type { Project } from "@/components/landing/ProjectCard"

/* Every number here comes from the resume or the project's own README.
   Change a figure in one place and the homepage and /portfolio both update. */

export const FEATURED: Project[] = [
    {
        name: "Tally",
        kind: "Startup · Founder",
        blurb:
            "Started as a HackUTA hackathon project and turned into a startup we're building. Tally does move-in and move-out property inspections over a live FaceTime call: Mechus, the voice assistant, walks the tenant through the unit, compares what it sees against the move-in footage, and only calls out damage that looks new. Landlords and tenants get the report over iMessage.",
        stat: { label: "Live, give it a try", value: "mechus.casa" },
        stack: ["Python", "MongoDB Atlas", "LiveKit", "ElevenLabs", "Gemini"],
        href: "https://mechus.casa/",
        external: true,
        source: "https://github.com/Odey340/Mechus",
        badges: [{ src: "/badges/tally.svg", alt: "Tally" }],
        award: "HackUTA: Best Use of Chert",
        glow: "200 240 60",
        index: "01",
        wide: true,
    },
    {
        name: "Pfeilstorch",
        kind: "Literary journal · Founder",
        blurb:
            "A literary journal I started, edit, and built end to end. Pfeilstorch Fiction publishes micro-fiction and poetry under 900 words and answers every submission within 48 hours. The other half, Pfeilstorch Labs, is the product page for Proof, a tool to help journals and contests filter AI-generated work out of their submissions. It runs on Storch-1, a detection model trained only on creative writing that's still in training.",
        stat: { label: "Visitors a month", value: "~3,000" },
        stack: ["Next.js", "Supabase", "PostgreSQL", "Vercel"],
        href: "https://pfielstorch.vercel.app/",
        external: true,
        source: "https://github.com/Odey340/pfielstorch",
        glow: "214 70 70",
        index: "02",
        wide: true,
    },
    {
        name: "Artemis",
        kind: "Trading system",
        blurb:
            "A C++ arbitrage bot for prediction markets. It tries to match the same event on Kalshi and Polymarket and flags spots where YES on one plus NO on the other costs less than the $1 payout. I ended up trading it with real money.",
        stat: { label: "Profit", value: "$13,000" },
        stack: ["C++17", "Kalshi", "Polymarket"],
        href: "/projects/artemis",
        source: "https://github.com/Odey340/Artemis",
        glow: "79 209 130",
        index: "03",
    },
    {
        name: "Tick-Level Futures Backtester",
        kind: "Backtester",
        blurb:
            "A pretty fast backtester for E-mini S&P 500 tick data. It uses memory-mapped input, incremental EWMA stats, a lock-free ring buffer, and simulated fills with slippage and commissions. Gives the same output on GCC and Clang.",
        stat: { label: "Per tick", value: "450 ns" },
        stack: ["C++17", "Python", "GoogleTest"],
        href: "https://github.com/Odey340/Artemist",
        external: true,
        glow: "111 179 154",
        index: "04",
    },
    {
        name: "Scallion",
        kind: "Statistical modeling",
        blurb:
            "A hackathon project. We fit a statistical surrogate model to 432 simulations, checked it with 5-fold cross-validation, and put it in an app that estimates biological age.",
        stat: { label: "Surrogate fit, R²", value: "0.9997" },
        stack: ["Python", "MATLAB"],
        href: "https://scallion.us/",
        external: true,
        source: "https://github.com/Odey340/Scallion",
        devpost: "https://devpost.com/software/scallion",
        badges: [
            { src: "/badges/rice.png", alt: "Rice University" },
            { src: "/badges/mathworks.png", alt: "MathWorks" },
        ],
        award: "HackRice 16: 2 prizes out of 121 teams",
        glow: "169 196 108",
        index: "05",
    },
    {
        name: "TideTracker",
        kind: "Data pipeline",
        blurb:
            "A real-time pipeline for sensor feeds: some schema validation, PostgreSQL storage, and a live React dashboard to keep an eye on it all.",
        stat: { label: "p99 dashboard query", value: "38 ms" },
        stack: ["C++", "Python", "PostgreSQL", "React"],
        href: "https://github.com/Odey340/TideAPI",
        external: true,
        glow: "127 224 166",
        index: "06",
    },
]

/** Older and side projects, shown only on /portfolio. */
export const MORE: Project[] = [
    {
        name: "Lumina",
        kind: "Personal strategy",
        blurb:
            "A mean-reversion idea around earnings-call volatility, with z-score entries and volatility-scaled thresholds. Still kind of a work in progress.",
        stat: { label: "Signal", value: "Z-score" },
        stack: ["C++", "Statistics"],
        href: "/projects/lumina",
        source: "https://github.com/Odey340/Lumina",
        glow: "143 165 154",
        index: "07",
    },
    {
        name: "ClashWinner",
        kind: "Simulation",
        blurb: "An overlay that simulates Clash Royale positions and suggests what might be the best move. Mostly for fun.",
        stat: { label: "Approach", value: "Simulation" },
        stack: ["Python"],
        href: "https://github.com/Odey340/Carn",
        external: true,
        glow: "143 165 154",
        index: "08",
    },
]

export type Role = {
    title: string
    org: string
    when: string
    where: string
    points: string[]
    /** Optional link for the org name, e.g. a company website. */
    href?: string
}

export const EXPERIENCE: Role[] = [
    {
        title: "Founder",
        org: "Tally",
        href: "https://mechus.casa/",
        when: "2026 – Present",
        where: "mechus.casa",
        points: [
            "Started Tally at HackUTA and kept building it with my team afterward: AI property inspections over a live FaceTime call, where Mechus, our voice assistant, guides the tenant and flags only the damage that's new since move-in.",
            "The backend leans on MongoDB Atlas for the boring-but-important parts, like retry-safe onboarding, conflict-checked report updates, and exactly-once iMessage delivery.",
        ],
    },
    {
        title: "Full-Stack Intern",
        org: "DFW International Airport",
        when: "May 2026 – Present",
        where: "DFW Airport, TX",
        points: [
            "Helped swap a manual spot-check process for automated validation and regression tests, so results reproduce run to run and schema changes upstream get caught before they hit the forecasts.",
            "Working on the operational data behind demand forecasting models that feed into scheduling.",
        ],
    },
    {
        title: "Undergraduate Research Assistant, Embedded Systems",
        org: "University of Texas at Tyler",
        when: "Apr 2026 – Present",
        where: "Tyler, TX",
        points: [
            "Wrote some custom firmware to automate data collection on embedded hardware for the lab's experiments.",
            "Trying out AI methods on Bluetooth and ultra-wideband (UWB) channel sounding measurements.",
        ],
    },
    {
        title: "Undergraduate Research Assistant, Program Analysis",
        org: "University of Texas at Dallas, advised by Dr. Shiyi Wei",
        when: "Summer 2026",
        where: "Remote",
        points: [
            "Reproduced VAFuzz (Variability-Aware Fuzzing), a security-testing tool from the group, and wrote some C++ for it.",
            "Helped test whether bringing LLMs into the fuzzing workflow actually makes it better.",
        ],
    },
    {
        title: "Software Engineer Intern, Full-Stack",
        org: "Jump Finance",
        when: "Sep 2025 – May 2026",
        where: "Remote",
        points: [
            "Shipped features end to end, from design to release, for financial data workflows where the numbers really needed to be right.",
            "Wrote unit and integration tests to catch bugs before release, and stuck around to support things after launch.",
        ],
    },
    {
        title: "Technical Intern, Data Analysis",
        org: "Texas Department of Transportation",
        when: "May 2024 – Aug 2024",
        where: "Texarkana, TX",
        points: [
            "Built some Python and R data pipelines that turned traffic sensor data into stuff engineers could use.",
        ],
    },
]

export const EDUCATION = {
    school: "University of Texas at Tyler",
    degree: "B.S. Computer Science, Minor in English",
    when: "Aug 2023 – Dec 2027 (expected)",
    grad: "Dec 2027",
    coursework: ["Data Structures & Algorithms", "Operating Systems", "Numerical Algorithms", "Probability & Statistics"],
    honors: "HackUTA: Best Use of Chert. HackRice 16: Best Use of MathWorks and Best Use of Backboard.io, out of 121 teams",
}
