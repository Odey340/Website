import { format } from 'date-fns';

const ALPHA_VANTAGE_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

export interface MarketPoint {
    date: string;
    value: number;
    percentChange: string;
}

export async function getSpyPerformance(startDate: string): Promise<MarketPoint[] | null> {
    if (!ALPHA_VANTAGE_KEY) {
        console.warn('Alpha Vantage API key missing. Falling back to mock data.');
        return null;
    }

    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=SPY&apikey=${ALPHA_VANTAGE_KEY}&outputsize=compact`;
        const response = await fetch(url);
        const data = await response.json();

        const timeSeries = data['Time Series (Daily)'];
        if (!timeSeries) {
            console.error('Invalid API response from Alpha Vantage:', data);
            return null;
        }

        const startPrice = parseFloat(timeSeries[startDate]?.['5. adjusted close']);
        if (!startPrice) {
            console.warn(`Could not find SPY price for ${startDate}. Using mock data.`);
            return null;
        }

        const dates = Object.keys(timeSeries).sort();
        const performanceData: MarketPoint[] = [];

        dates.forEach(date => {
            if (new Date(date) >= new Date(startDate)) {
                const currentPrice = parseFloat(timeSeries[date]['5. adjusted close']);
                const percentChange = ((currentPrice / startPrice - 1) * 100).toFixed(2);
                performanceData.push({
                    date,
                    value: currentPrice / startPrice,
                    percentChange
                });
            }
        });

        return performanceData;
    } catch (error) {
        console.error('Error fetching SPY data:', error);
        return null;
    }
}
