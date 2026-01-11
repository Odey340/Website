# Portfolio Tracker

A real-time portfolio tracking website that compares your custom investment portfolio against SPY (S&P 500 ETF).

## Portfolio Composition

This tracker monitors a 23-asset portfolio with the following allocations:
- 5% each: Bitcoin, MU, AMC, ASTS, TQQQ, BTE, PLTR, VXUS, QQQM, VTI, STRF, TTWO, BORR, EVEX, BB, CLVT
- 10% TV (Grupo Televisa)
- 3% each: NXDR, UA
- 1% each: UWMC, RIG, AAPL, TSLA

## Features

- 📈 Real-time performance comparison vs SPY
- 📊 Interactive line chart visualization
- 🎯 Percentage gain/loss since January 1, 2026
- 🔄 Manual refresh capability
- 🌙 Dark mode UI

## Setup

### 1. Get an API Key

This app uses Alpha Vantage for stock data. Get your free API key:
1. Visit https://www.alphavantage.co/support/#api-key
2. Enter your email and get instant access
3. Free tier includes 25 API calls/day

### 2. Configure Environment

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_ALPHA_VANTAGE_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push this repository to GitHub
2. Import to Vercel
3. Add environment variable: `NEXT_PUBLIC_ALPHA_VANTAGE_KEY`
4. Deploy!

### Other Platforms

Works on any platform that supports Next.js (Netlify, Railway, etc.)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API**: Alpha Vantage
- **Language**: TypeScript

## Notes

- Data updates when you click "Refresh Data"
- Free API tier has rate limits (25 calls/day)
- Historical data starts from January 1, 2026
- Bitcoin is tracked as BTC-USD

## Link from Main Portfolio

To link this from your main portfolio website, update the Lumina card in `src/app/portfolio/page.tsx`:

```tsx
<Link href="https://your-portfolio-tracker.vercel.app" target="_blank">
  {/* Lumina card content */}
</Link>
```
