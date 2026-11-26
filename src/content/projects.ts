import type { Project } from "@/components/landing/ProjectCard"

/* Every number here comes from the resume or the project's own README.
   Change a figure in one place and the homepage and /portfolio both update. */

export const FEATURED: Project[] = [
    {
        name: "Tally",
        kind: "Startup · Founder",
        blurb:
            "Started as a HackUTA hackathon project and turned into a startup we're building, now funded through the Chert Fellowship. Tally does move-in and move-out property inspections over a live FaceTime call: Mechus, the voice assistant, walks the tenant through the unit, compares what it sees against the move-in footage, and only calls out damage that looks new. Landlords and tenants get the report over iMessage.",
        stat: { label: "Live, give it a try", value: "mechus.casa" },
        stack: ["Python", "MongoDB Atlas", "LiveKit", "ElevenLabs", "Gemini"],
        href: "https://mechus.casa/",
        external: true,
        source: "https://github.com/Odey340/Mechus",
        badges: [{ src: "/badges/tally.svg", alt: "Tally" }],
        award: "HackUTA: 3rd Place, Chert Track",
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
        badges: [{ src: "/badges/pfeilstorch.svg", alt: "Pfeilstorch" }],
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
        name: "Olly",
        kind: "Backtester",
        blurb:
            "A tick-level futures backtester in C++. It replays quotes one at a time and fills orders the way an exchange would: on a later quote, at the bid or ask, with slippage and commission. Prices are fixed-point, so it makes the same trades on GCC, Clang, and MSVC, and CI checks that on every push.",
        stat: { label: "Per tick, parsing included", value: "~50 ns" },
        stack: ["C++17", "Python", "GoogleTest"],
        href: "https://github.com/Odey340/Olly",
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
        kind: "Live data app",
        blurb:
            "Live tides for any coast. On US coasts it uses the nearest NOAA station's predictions and overlays the live gauge reading. Everywhere else it falls back to a global ocean model and finds the highs and lows itself. There's a JSON API too.",
        stat: { label: "NOAA stations", value: "3,500+" },
        stack: ["Next.js", "TypeScript", "NOAA CO-OPS", "Open-Meteo"],
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
        name: "Elixir Tracker",
        kind: "Game tool",
        blurb:
            "A second-screen tracker for your opponent's elixir in Clash Royale. Tap the cards they play and it works out their elixir using the real x1, x2 and x3 overtime rates, flags when they leak at 10, and once it has seen their 8 cards it tells you which 4 are in their hand. Mostly for fun.",
        stat: { label: "Elixir phases", value: "x1 → x3" },
        stack: ["Next.js", "TypeScript"],
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
    points: string[]
    /** Optional link for the org name, e.g. a company website. */
    href?: string
}

export const EXPERIENCE: Role[] = [
    {
        title: "Chert Fellow, Co-Founder of Tally",
        org: "Chert (YC-backed)",
        when: "Nov 2026 – Present",
        points: [
            "Chert is funding me to build Tally, which started as our HackUTA project: an AI agent that inspects short-term rentals over a live FaceTime call at each turnover, compares what it sees against the move-in footage, and reports only the damage that's new.",
            "The backend leans on MongoDB Atlas for the boring-but-important parts, like retry-safe onboarding, conflict-checked report updates, and exactly-once iMessage delivery.",
        ],
    },
    {
        title: "Full-Stack Intern",
        org: "DFW International Airport",
        when: "May 2026 – Aug 2026",
        points: [
            "Helped swap a manual spot-check process for automated validation and regression tests, so results reproduce run to run and schema changes upstream get caught before they hit the forecasts.",
            "Worked on the operational data behind demand forecasting models that feed into scheduling.",
        ],
    },
    {
        title: "Undergraduate Research Assistant, Embedded Systems",
        org: "University of Texas at Tyler",
        when: "Apr 2026 – Present",
        points: [
            "Wrote some custom firmware to automate data collection on embedded hardware for the lab's experiments.",
            "Trying out AI methods on Bluetooth and ultra-wideband (UWB) channel sounding measurements.",
        ],
    },
    {
        title: "Software Engineer, Full-Stack",
        org: "Jump Finance",
        when: "Sep 2025 – Present",
        points: [
            "Shipped features end to end, from design to release, for financial data workflows where the numbers really needed to be right.",
            "Wrote unit and integration tests to catch bugs before release, and stuck around to support things after launch.",
        ],
    },
    {
        title: "Undergraduate Research Assistant, Program Analysis",
        org: "University of Texas at Dallas, advised by Dr. Shiyi Wei",
        when: "May 2025 – Aug 2025",
        points: [
            "Reproduced VAFuzz (Variability-Aware Fuzzing), a security-testing tool from the group, and wrote some C++ for it.",
            "Helped test whether bringing LLMs into the fuzzing workflow actually makes it better.",
        ],
    },
    {
        title: "Technical Intern, Data Analysis",
        org: "Texas Department of Transportation",
        when: "May 2024 – Aug 2024",
        points: [
            "Built some Python and R data pipelines that turned traffic sensor data into stuff engineers could use.",
        ],
    },
]

export const EDUCATION = {
    school: "University of Texas at Tyler",
    degree: "B.S. Computer Science, Minor in English",
    when: "Aug 2023 – May 2027 (expected)",
    grad: "May 2027",
    coursework: ["Data Structures & Algorithms", "Operating Systems", "Numerical Algorithms", "Probability & Statistics"],
    honors: "HackUTA: 3rd Place, Chert Track, which led to the Chert Fellowship. HackRice 16: Best Use of MathWorks and Best Use of Backboard.io, out of 121 teams",
}
