'use client'

interface TickerItem {
  symbol: string
  change: number
}

const tickers: TickerItem[] = [
  { symbol: 'AAPL', change: 0.45 },
  { symbol: 'TSLA', change: -0.25 },
  { symbol: 'NKE', change: -2.21 },
  { symbol: 'META', change: 0.21 },
  { symbol: 'NVDA', change: -0.45 },
  { symbol: 'AMZN', change: 0.89 }
]

export function TickerTape() {
  return (
    <div className="bg-gray-900 p-2 -mx-8 mb-8 overflow-hidden">
      <div className="flex items-center space-x-6 animate-scroll">
        {tickers.map((ticker) => (
          <div key={ticker.symbol} className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">{ticker.symbol}</span>
            <span
              className={`text-sm ${
                ticker.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {ticker.change >= 0 ? '+' : ''}
              {ticker.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 