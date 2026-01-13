import { NextResponse } from 'next/server';
import { getSpyPerformance } from '@/lib/marketData';

// Seeded random number generator for consistent results
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Generate consistent mock data with target end value
function generateMockDataWithTarget(startDate: string, targetReturn: number, seed: number = 12345) {
    const data: { [key: string]: { date: string; value: number; percentChange: string } } = {};
    const start = new Date(startDate);
    const today = new Date();

    // Calculate number of days
    const daysDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate daily growth rate to reach target
    const targetMultiplier = 1 + (targetReturn / 100);
    const dailyGrowth = Math.pow(targetMultiplier, 1 / daysDiff) - 1;

    let currentValue = 1.0;
    let seedCounter = seed;

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];

        // Add some realistic volatility around the trend
        const noise = (seededRandom(seedCounter++) - 0.5) * 0.015;
        currentValue *= (1 + dailyGrowth + noise);

        const percentChange = ((currentValue - 1) * 100).toFixed(2);

        data[dateStr] = {
            date: dateStr,
            value: currentValue,
            percentChange
        };
    }

    // Adjust final value to exactly match target
    const finalDate = today.toISOString().split('T')[0];
    data[finalDate].value = targetMultiplier;
    data[finalDate].percentChange = targetReturn.toFixed(2);

    return Object.values(data);
}

// Generate standard mock data for SPY
function generateMockData(startDate: string, volatility: number = 0.02, trend: number = 0.001, seed: number = 12345) {
    const data: { [key: string]: { date: string; value: number; percentChange: string } } = {};
    const start = new Date(startDate);
    const today = new Date();

    let currentValue = 1.0;
    let seedCounter = seed;

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];

        const randomChange = (seededRandom(seedCounter++) - 0.5) * volatility;
        currentValue *= (1 + trend + randomChange);

        const percentChange = ((currentValue - 1) * 100).toFixed(2);

        data[dateStr] = {
            date: dateStr,
            value: currentValue,
            percentChange
        };
    }

    return Object.values(data);
}

export async function GET() {
    try {
        const startDate = '2026-01-01';

        // Portfolio (50% MU, 20% VXUS, 20% ASTS, 10% TQQQ): 8.40% YTD (Down 0.51% today)
        const portfolioPerformance = generateMockDataWithTarget(startDate, 8.40, 42);

        // Manual override for portfolio dips (Jan 10-12 sequence)
        const todayStr = new Date().toISOString().split('T')[0];
        const prev1 = new Date(); prev1.setDate(prev1.getDate() - 1);
        const prev1Str = prev1.toISOString().split('T')[0];
        const prev2 = new Date(); prev2.setDate(prev2.getDate() - 2);
        const prev2Str = prev2.toISOString().split('T')[0];

        portfolioPerformance.forEach(p => {
            if (p.date === prev1Str) { p.value = 1.0891; p.percentChange = "8.91"; }
            if (p.date === prev2Str) { p.value = 1.0902; p.percentChange = "9.02"; }
        });

        // SPY: Live data if possible, fallback to mock 1.94%
        let spyPerformance = await getSpyPerformance(startDate);
        if (!spyPerformance) {
            spyPerformance = generateMockDataWithTarget(startDate, 1.94, 99);
        }

        return NextResponse.json({
            portfolio: portfolioPerformance,
            spy: spyPerformance,
            startDate,
            dailyChange: -0.51,
            lastUpdated: "2026-01-13T15:41:19",
            fundInfo: {
                majorityStake: "Netflix"
            },
            composition: { MU: 0.50, VXUS: 0.20, ASTS: 0.20, TQQQ: 0.10 },
            note: 'Portfolio: 50% MU, 20% VXUS, 20% ASTS, 10% TQQQ'
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
