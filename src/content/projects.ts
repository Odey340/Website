import type { Project } from "@/components/landing/ProjectCard"

/* Every number here comes from the resume or the project's own README.
   Change a figure in one place and the homepage and /portfolio both update. */

export const FEATURED: Project[] = [
    {
        name: "Artemis",
        kind: "Trading system",
        blurb:
            "C++ arbitrage engine for prediction markets. It matches equivalent event contracts on Kalshi and Polymarket and flags trades where YES on one venue plus NO on the other costs less than the $1 the pair must pay out. Traded with real money.",
        stat: { label: "Realized profit", value: "$13,000" },
        stack: ["C++17", "Kalshi", "Polymarket"],
        href: "/projects/artemis",
        source: "https://github.com/Odey340/Artemis",
        glow: "163 201 160",
        index: "01",
    },
    {
        name: "Tick-Level Futures Backtester",
        kind: "Backtester",
        blurb:
            "Low-latency backtester for E-mini S&P 500 ticks. Memory-mapped input, O(1) incremental EWMA statistics, a lock-free multi-producer ring buffer, and simulated fills with slippage and commissions. Bit-identical across GCC and Clang.",
        stat: { label: "Per tick, 2.2M ticks/s", value: "450 ns" },
        stack: ["C++17", "Python", "GoogleTest"],
        href: "https://github.com/Odey340/Artemist",
        external: true,
        glow: "147 189 230",
        index: "02",
    },
    {
        name: "Scallion",
        kind: "Statistical modeling",
        blurb:
            "Fit a statistical surrogate model to 432 simulations and validated it out of sample with 5-fold cross-validation, then deployed it in an app that estimates biological age.",
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
        glow: "242 201 107",
        index: "03",
    },
    {
        name: "TideTracker",
        kind: "Data pipeline",
        blurb:
            "Real-time ingestion and query pipeline for continuous sensor feeds: schema validation, PostgreSQL storage, and a live React monitoring dashboard.",
        stat: { label: "p99 dashboard query", value: "38 ms" },
        stack: ["C++", "Python", "PostgreSQL", "React"],
        href: "https://github.com/Odey340/TideAPI",
        external: true,
        glow: "255 138 87",
        index: "04",
    },
]

/** Older and side projects, shown only on /portfolio. */
export const MORE: Project[] = [
    {
        name: "Lumina",
        kind: "Personal strategy",
        blurb:
            "Mean-reversion strategy timed to earnings-call volatility, with a z-score entry and volatility-scaled thresholds.",
        stat: { label: "Signal", value: "Z-score" },
        stack: ["C++", "Statistics"],
        href: "/projects/lumina",
        source: "https://github.com/Odey340/Lumina",
        glow: "242 154 154",
        index: "05",
    },
    {
        name: "ClashWinner",
        kind: "Simulation",
        blurb: "Overlay that simulates Clash Royale positions and suggests the move with the best expected outcome.",
        stat: { label: "Approach", value: "Simulation" },
        stack: ["Python"],
        href: "https://github.com/Odey340/Carn",
        external: true,
        glow: "242 154 154",
        index: "06",
    },
]

export type Role = {
    title: string
    org: string
    when: string
    where: string
    points: string[]
}

export const EXPERIENCE: Role[] = [
    {
        title: "Full-Stack Intern",
        org: "DFW International Airport",
        when: "May 2026 – Present",
        where: "DFW Airport, TX",
        points: [
            "Swapped an error-prone manual spot-check process for an automated validation and regression test suite. Results now reproduce run to run, and upstream schema drift gets caught before it reaches the forecasts.",
            "Build and validate the operational data behind demand forecasting models used for time-critical scheduling decisions.",
        ],
    },
    {
        title: "Undergraduate Research Assistant, Embedded Systems",
        org: "University of Texas at Tyler",
        when: "Apr 2026 – Present",
        where: "Tyler, TX",
        points: [
            "Wrote custom firmware to automate data collection on embedded hardware, producing the experimental datasets.",
            "Apply AI methods to analyze Bluetooth and ultra-wideband (UWB) channel sounding measurements from embedded devices.",
        ],
    },
    {
        title: "Undergraduate Research Assistant, Program Analysis",
        org: "University of Texas at Dallas, advised by Dr. Shiyi Wei",
        when: "Summer 2026",
        where: "Remote",
        points: [
            "Reproduced VAFuzz (Variability-Aware Fuzzing), a security-testing system from the group's research, and wrote C++ code for it.",
            "Worked with the group to bring large language models into the fuzzing workflow and test whether they improve its results.",
        ],
    },
    {
        title: "Software Engineer Intern, Full-Stack",
        org: "Jump Finance",
        when: "Sep 2025 – May 2026",
        where: "Remote",
        points: [
            "Shipped production features end to end, from design through testing and release, for financial data workflows where every record had to be exactly right.",
            "Wrote unit and integration tests that caught regressions before release, and supported my features after launch.",
        ],
    },
    {
        title: "Technical Intern, Data Analysis",
        org: "Texas Department of Transportation",
        when: "May 2024 – Aug 2024",
        where: "Texarkana, TX",
        points: [
            "Built reproducible Python and R data pipelines that turned high-volume traffic sensor feeds into engineering analyses.",
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
