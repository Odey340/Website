import { NextResponse } from 'next/server';

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

        // Portfolio (50% MU, 20% VXUS, 20% ASTS, 10% TQQQ): 9.02% YTD
        const portfolioPerformance = generateMockDataWithTarget(startDate, 9.02, 42);

        // SPY: standard growth
        const spyPerformance = generateMockData(startDate, 0.015, 0.0006, 99);

        return NextResponse.json({
            portfolio: portfolioPerformance,
            spy: spyPerformance,
            startDate,
            composition: { MU: 0.50, VXUS: 0.20, ASTS: 0.20, TQQQ: 0.10 },
            note: 'Portfolio: 50% MU, 20% VXUS, 20% ASTS, 10% TQQQ'
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
