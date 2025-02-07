'use client'

interface DistributionItem {
  name: string
  value: number
  percentage: number
}

interface PortfolioDistributionProps {
  totalValue: number
  totalChangePercentage: number
  distribution: DistributionItem[]
}

export function PortfolioDistribution({
  totalValue,
  totalChangePercentage,
  distribution
}: PortfolioDistributionProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total em Ativos</h2>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(totalValue)}
            </span>
            <span className="ml-2 text-sm text-green-600 dark:text-green-500">
              +{totalChangePercentage.toFixed(1)}% este ano
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {distribution.map((item) => (
          <div key={item.name} className="flex items-center">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.percentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-900 dark:text-white">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 