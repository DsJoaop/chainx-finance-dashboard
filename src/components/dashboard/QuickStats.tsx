'use client'

interface QuickStatsProps {
  metrics: {
    annualReturn: number
    averageAssetValue: number
    totalAssets: number
    monthlyChange: number
  }
}

export function QuickStats({ metrics }: QuickStatsProps) {
  return (
    <div className="grid gap-4 mb-8 md:grid-cols-4">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/20 rounded-lg mr-3">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Retorno Anual</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {metrics.annualReturn.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 dark:bg-green-500/20 rounded-lg mr-3">
            <svg className="w-6 h-6 text-green-600 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Média por Ativo</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                notation: 'compact'
              }).format(metrics.averageAssetValue)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex items-center">
          <div className="p-2 bg-amber-50 dark:bg-amber-500/20 rounded-lg mr-3">
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total de Ativos</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {metrics.totalAssets}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
        <div className="flex items-center">
          <div className="p-2 bg-rose-50 dark:bg-rose-500/20 rounded-lg mr-3">
            <svg className="w-6 h-6 text-rose-600 dark:text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Retorno Mensal</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                notation: 'compact'
              }).format(metrics.monthlyChange)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 