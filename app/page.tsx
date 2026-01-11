'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PerformanceData {
  date: string;
  value: number;
  percentChange: string;
}

interface ApiResponse {
  portfolio: PerformanceData[];
  spy: PerformanceData[];
  startDate: string;
}

// Lumina historical data for 2025
const lumina2025Data = [
  { month: 'Jan', return: 2.1 },
  { month: 'Feb', return: 4.5 },
  { month: 'Mar', return: 6.8 },
  { month: 'Apr', return: 9.2 },
  { month: 'May', return: 11.5 },
  { month: 'Jun', return: 14.8 },
  { month: 'Jul', return: 17.2 },
  { month: 'Aug', return: 19.5 },
  { month: 'Sep', return: 22.1 },
  { month: 'Oct', return: 24.8 },
  { month: 'Nov', return: 27.2 },
  { month: 'Dec', return: 29.5 },
];

function CurrentPortfolio() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/portfolio');
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-zinc-400 text-xl font-mono">Loading portfolio data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-500 text-xl font-mono">Error: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const chartData = data.portfolio.map((p, index) => ({
    date: format(new Date(p.date), 'MMM dd'),
    portfolio: parseFloat(p.percentChange),
    spy: parseFloat(data.spy[index]?.percentChange || '0'),
  }));

  const latestPortfolio = data.portfolio[data.portfolio.length - 1];
  const latestSpy = data.spy[data.spy.length - 1];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-sm text-zinc-400 font-mono mb-2">Your Portfolio</div>
          <div className={`text-3xl font-bold ${latestPortfolio && parseFloat(latestPortfolio.percentChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {latestPortfolio ? (parseFloat(latestPortfolio.percentChange) >= 0 ? '+' : '') : ''}{latestPortfolio?.percentChange || '0'}%
          </div>
          <div className="text-xs text-zinc-500 mt-1">Since Jan 1, 2026</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-sm text-zinc-400 font-mono mb-2">SPY (S&P 500)</div>
          <div className={`text-3xl font-bold ${latestSpy && parseFloat(latestSpy.percentChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {latestSpy ? (parseFloat(latestSpy.percentChange) >= 0 ? '+' : '') : ''}{latestSpy?.percentChange || '0'}%
          </div>
          <div className="text-xs text-zinc-500 mt-1">Since Jan 1, 2026</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="date"
              stroke="#71717a"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#71717a"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px'
              }}
              formatter={(value: number | undefined) => value !== undefined ? `${value.toFixed(2)}%` : 'N/A'}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#22c55e"
              strokeWidth={2}
              name="Your Portfolio"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="spy"
              stroke="#3b82f6"
              strokeWidth={2}
              name="SPY"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
          <p className="text-sm text-zinc-300 leading-relaxed">
            <span className="font-semibold text-zinc-100">Micron</span> is the heavyweight in our portfolio. Following their record-breaking Q1 2026 earnings report in late December, the stock has continued to climb
          </p>
        </div>
        <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <h3 className="text-sm font-semibold text-zinc-100 mb-2">Our Strategy: Mean Reversion</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Mean reversion, once the most popular quantitative strategy on Wall Street, remains highly profitable today.
            Our approach capitalizes on the statistical tendency of asset prices to revert to their historical averages.
            When securities deviate significantly from their mean values, we identify these mispricings as opportunities.
            By systematically buying undervalued assets and selling overvalued ones, we exploit market inefficiencies that
            persist despite the evolution of modern markets. This time-tested methodology, combined with rigorous quantitative
            research and disciplined risk management, continues to generate consistent alpha in today's dynamic trading environment.
            we time this up with earnings reports to develop a stategy that consistently outperforms the market.
          </p>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={fetchData}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-6 py-3 rounded-lg font-mono transition-colors"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

function LuminaPortfolio() {
  return (
    <div className="space-y-8">
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-sm text-zinc-400 font-mono mb-2">Lumina Performance</div>
          <div className="text-3xl font-bold text-green-500">+29.5%</div>
          <div className="text-xs text-zinc-500 mt-1">Full Year 2025</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">2025 Performance</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lumina2025Data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis
              dataKey="month"
              stroke="#71717a"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#71717a"
              style={{ fontSize: '12px' }}
              tickFormatter={(value: number | undefined) => value !== undefined ? `${value}%` : '0%'}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px'
              }}
              formatter={(value: number | undefined) => value !== undefined ? `${value.toFixed(1)}%` : 'N/A'}
            />
            <Line
              type="monotone"
              dataKey="return"
              stroke="#00ff9d"
              strokeWidth={2}
              name="Cumulative Return"
              dot={{ fill: '#00ff9d', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-sm text-zinc-400 font-mono mb-2">Best Month</div>
          <div className="text-2xl font-bold text-green-500">+3.2%</div>
          <div className="text-xs text-zinc-500 mt-1">December 2025</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-sm text-zinc-400 font-mono mb-2">Avg Monthly</div>
          <div className="text-2xl font-bold text-green-500">+2.46%</div>
          <div className="text-xs text-zinc-500 mt-1">Consistent Growth</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="text-sm text-zinc-400 font-mono mb-2">Sharpe Ratio</div>
          <div className="text-2xl font-bold text-blue-500">1.15</div>
          <div className="text-xs text-zinc-500 mt-1">Risk-Adjusted</div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioTracker() {
  const [activeTab, setActiveTab] = useState<'current' | 'lumina'>('current');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Portfolio Performance</h1>
            <p className="text-zinc-400 font-mono">
              Private portfolio tracking
            </p>
          </div>
          <a
            href="https://github.com/Odey340/luminafund"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-lg text-sm font-mono transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Tabs */}
        <div className="border-b border-zinc-800">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('current')}
              className={`pb-4 px-2 font-mono text-sm transition-colors ${activeTab === 'current'
                ? 'text-zinc-100 border-b-2 border-green-500'
                : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              Current (2026)
            </button>
            <button
              onClick={() => setActiveTab('lumina')}
              className={`pb-4 px-2 font-mono text-sm transition-colors ${activeTab === 'lumina'
                ? 'text-zinc-100 border-b-2 border-green-500'
                : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              Lumina (2025)
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'current' ? <CurrentPortfolio /> : <LuminaPortfolio />}
      </div>
    </div>
  );
}
